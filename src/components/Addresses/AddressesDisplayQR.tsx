import { useCallback, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Address } from "viem";

import { useBoolean } from "@/hooks/useBoolean";
import { Box } from "@/vendor/gluestack-ui/box";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import { ContainButton } from "../Button";
import { AlertDialog } from "../Dialog";
import { BottomInputDrawer } from "../Drawer";
import QRCode, { QRCodeHandle } from "../QRCode";
import { ErrorText } from "../Text";

type AddressesDisplayQRProps = {
  name: string;
  address: Address;
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
};

const AddressesDisplayQR = (props: AddressesDisplayQRProps) => {
  const { name, address, componentProps } = props;
  const [isShowErrorDialog, setIsShowErrorDialog] = useBoolean(false);

  const qrCodeRef = useRef<QRCodeHandle | null>(null);

  const handleShareAddress = useCallback(async () => {
    try {
      await qrCodeRef.current?.handleShare();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <BottomInputDrawer {...componentProps}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
        >
          <VStack className="flex-1 w-full items-center py-4 gap-y-6">
            <VStack className="w-full gap-y-2">
              <HStack className="gap-x-2">
                <Box className="w-1.5 bg-primary-500" />
                <Text className="font-bold">アドレス情報</Text>
              </HStack>
              <VStack className="border-[0.5px] border-secondary-300 px-5 py-6 bg-secondary-50 rounded-xl">
                <VStack className="gap-y-1">
                  <Text className="font-bold text-secondary-600">名前</Text>
                  <Text className="font-bold text-secondary-800 text-right">{name}</Text>
                </VStack>
                <VStack className="gap-y-1">
                  <Text className="font-bold text-secondary-600">アドレス</Text>
                  <Text className="font-bold text-secondary-800 text-right">{address}</Text>
                </VStack>
              </VStack>
            </VStack>
            <QRCode ref={qrCodeRef} path="addresses" query={{ name, address }} size={275} />
            <ContainButton text="共有" size="lg" className="w-full mt-auto" onPress={handleShareAddress} />
          </VStack>
        </KeyboardAwareScrollView>
      </BottomInputDrawer>

      <AlertDialog title="QRコード共有の失敗" isOpen={isShowErrorDialog} onClose={setIsShowErrorDialog.off} size="lg">
        <VStack className="py-4 gap-y-2">
          <ErrorText className="flex-1">不明なエラーによりQRコードの共有に失敗しました。</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default AddressesDisplayQR;
