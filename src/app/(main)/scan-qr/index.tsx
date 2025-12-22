import { CameraView } from "expo-camera";
import { Image } from "lucide-react-native";

import BackDrop from "@/presentation/components/BackDrop";
import { AlertDialog } from "@/presentation/components/Dialog";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { Fab, FabIcon } from "@/presentation/components/gluestack-ui/fab";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText } from "@/presentation/components/Text";

import ScreenContainer from "../_components/ScreenContainer";

import useSacnQrCode from "./_hooks/useSacnQrCode";

export const ScanQrScreen = () => {
  const { permission, isScanning, isError, setIsError, onBarcodeScanned, handlePickImageAndScan } = useSacnQrCode();

  if (!permission) return <BackDrop visible />;

  return (
    <ScreenContainer appBarProps={{ title: "スキャン" }} className="bg-white rounded-t-2xl">
      <Box className="flex-1">
        {permission.granted ? (
          <>
            <CameraView
              style={{ flex: 1 }}
              facing="back"
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              onBarcodeScanned={isScanning ? undefined : onBarcodeScanned}
            />

            <AlertDialog title="読み取り失敗" isOpen={isError} onClose={setIsError.off} size="lg">
              <VStack className="py-4 gap-y-1">
                <ErrorText>QRコードの読み取りに失敗しました。</ErrorText>
              </VStack>
            </AlertDialog>

            <Fab
              size="lg"
              placement="bottom right"
              className="bg-primary-400 rounded-3xl bottom-7"
              onPress={handlePickImageAndScan}
            >
              <FabIcon as={Image} className="p-5" />
            </Fab>
          </>
        ) : (
          <VStack className="flex-1 justify-center items-center pb-32">
            <Text className="font-bold text-secondary-500">カメラ権限が必要です。</Text>
          </VStack>
        )}
      </Box>
    </ScreenContainer>
  );
};

export default ScanQrScreen;
