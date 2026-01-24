import { useCallback, useRef } from "react";
import { ScrollView } from "react-native";

import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { ContainButton } from "@/presentation/components/Button";
import { AlertDialog } from "@/presentation/components/Dialog";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import type { QRCodeHandle } from "@/presentation/components/QRCode";
import QRCode from "@/presentation/components/QRCode";
import { ErrorText } from "@/presentation/components/Text";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import ConfirmRecipient from "../confirm/ConfirmRecipient";

import type { Address } from "viem";

type AddressesDisplayQRProps = {
  name: string;
  address: Address;
  componentProps: Omit<React.ComponentProps<typeof BottomActionSheet>, "children">;
};

const AddressesDisplayQR = (props: AddressesDisplayQRProps) => {
  const { name, address, componentProps } = props;
  const [isShowErrorDialog, setIsShowErrorDialog] = useBoolean(false);

  const tw = useTw();

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
        <VStack className={cn("flex-1 w-full justify-between", tw.py(4), tw.gapY(7))}>
          <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
            <VStack className={cn("w-full flex-1 items-center", tw.gapY(7))}>
              <ConfirmRecipient title="アドレス情報" name={name} address={address} />
              <QRCode ref={qrCodeRef} path="addresses" query={{ name, address }} size={tw.scaleNum(275)} />
            </VStack>
          </ScrollView>
          <ContainButton text="共有" size="lg" className={cn("w-full mt-auto")} onPress={handleShareAddress} />
        </VStack>
      </BottomActionSheet>

      <AlertDialog title="QRコード共有の失敗" isOpen={isShowErrorDialog} onClose={setIsShowErrorDialog.off} size="lg">
        <VStack className={cn(tw.py(4), tw.gapY(2))}>
          <ErrorText>不明なエラーによりQRコードの共有に失敗しました。</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default AddressesDisplayQR;
