import { useCallback, useRef } from "react";
import { ScrollView } from "react-native";
import { Address } from "viem";

import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { ContainButton } from "@/presentation/components/Button";
import { AlertDialog } from "@/presentation/components/Dialog";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import QRCode, { QRCodeHandle } from "@/presentation/components/QRCode";
import { ErrorText } from "@/presentation/components/Text";
import { useBoolean } from "@/presentation/hooks/useBoolean";

import ConfirmRecipient from "../confirm/ConfirmRecipient";

type AddressesDisplayQRProps = {
  name: string;
  address: Address;
  componentProps: Omit<React.ComponentProps<typeof BottomActionSheet>, "children">;
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
      <BottomActionSheet {...componentProps}>
        <VStack className="flex-1 w-full justify-between py-4 gap-y-7">
          <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
            <VStack className="w-full flex-1 items-center gap-y-7">
              <ConfirmRecipient title="アドレス情報" name={name} address={address} />
              <QRCode ref={qrCodeRef} path="addresses" query={{ name, address }} size={275} />
            </VStack>
          </ScrollView>
          <ContainButton text="共有" size="lg" className="w-full mt-auto" onPress={handleShareAddress} />
        </VStack>
      </BottomActionSheet>

      <AlertDialog title="QRコード共有の失敗" isOpen={isShowErrorDialog} onClose={setIsShowErrorDialog.off} size="lg">
        <VStack className="py-4 gap-y-2">
          <ErrorText>不明なエラーによりQRコードの共有に失敗しました。</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default AddressesDisplayQR;
