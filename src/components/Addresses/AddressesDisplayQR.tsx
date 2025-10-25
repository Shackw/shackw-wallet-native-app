import { useCallback, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Address } from "viem";

import { useBoolean } from "@/hooks/useBoolean";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import { ContainButton } from "../Button";
import ConfirmRecipient from "../Confirm/ConfirmRecipient";
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
            <ConfirmRecipient title="アドレス情報" name={name} address={address} />
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
