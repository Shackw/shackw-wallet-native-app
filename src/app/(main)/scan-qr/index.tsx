import { CameraView, useCameraPermissions, type BarcodeScanningResult } from "expo-camera";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Linking } from "react-native";

import BackDrop from "@/components/BackDrop";
import { ScreenContainer } from "@/components/Container";
import { Box } from "@/vendor/gluestack-ui/box";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

export default function ScanQrScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const scanningRef = useRef(false);
  const cameraRef = useRef<CameraView>(null);

  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!permission?.granted) void requestPermission();
    return () => setEnabled(false);
  }, [permission, requestPermission]);

  const handleScan = useCallback(
    async (result: BarcodeScanningResult) => {
      if (scanningRef.current) return;
      scanningRef.current = true;
      setEnabled(false);

      const value = result.data ?? result.raw;
      if (!value) {
        scanningRef.current = false;
        setEnabled(true);
        return;
      }

      try {
        if (/^https?:\/\//i.test(value)) {
          await Linking.openURL(value);
        } else {
          router.replace("/");
        }
      } catch {
        scanningRef.current = false;
        setEnabled(true);
      }
    },
    [router]
  );

  const onBarcodeScanned = useCallback(
    (r: BarcodeScanningResult): void => {
      if (!enabled) return;
      void handleScan(r);
    },
    [enabled, handleScan]
  );

  if (!permission) return <BackDrop visible />;

  return (
    <ScreenContainer appBarProps={{ title: "スキャン" }} className="bg-white rounded-t-2xl">
      <Box className="flex-1">
        {permission.granted ? (
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={onBarcodeScanned}
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
