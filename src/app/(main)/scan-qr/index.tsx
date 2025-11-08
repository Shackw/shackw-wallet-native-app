import { CameraView, useCameraPermissions, type BarcodeScanningResult } from "expo-camera";
import { RelativePathString, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";

import { redirectSystemPath } from "@/app/+native-intent";
import BackDrop from "@/presentation/components/BackDrop";
import { ScreenContainer } from "@/presentation/components/Container";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useBoolean } from "@/presentation/hooks/useBoolean";

export default function ScanQrScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const [isScanning, setIsScanning] = useBoolean(false);

  useEffect(() => {
    if (permission?.granted === false) void requestPermission();
  }, [permission, requestPermission]);

  const handleScan = useCallback(
    async (result: BarcodeScanningResult) => {
      if (isScanning) return;
      setIsScanning.on();

      const value = result.data ?? result.raw;
      if (!value) {
        setIsScanning.off();
        return;
      }

      try {
        if (/^https?:\/\//i.test(value)) {
          const href = await redirectSystemPath({ path: value });
          router.replace(href as RelativePathString);
        } else {
          router.replace("/");
        }
      } catch (e) {
        console.warn("open failed", e);
        setIsScanning.off();
      }
    },
    [isScanning, router, setIsScanning]
  );

  const onBarcodeScanned = useCallback(
    (r: BarcodeScanningResult) => {
      void handleScan(r);
    },
    [handleScan]
  );

  if (!permission) return <BackDrop visible />;

  return (
    <ScreenContainer appBarProps={{ title: "スキャン" }} className="bg-white rounded-t-2xl">
      <Box className="flex-1">
        {permission.granted ? (
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={isScanning ? undefined : onBarcodeScanned}
          />
        ) : (
          <VStack className="flex-1 justify-center items-center pb-32">
            <Text className="font-bold text-secondary-500">カメラ権限が必要です。</Text>
          </VStack>
        )}
      </Box>
    </ScreenContainer>
  );
}
