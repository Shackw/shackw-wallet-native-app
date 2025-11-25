import { useRef, useCallback } from "react";
import { Address } from "viem";

import { ContainButton, SubContainButton } from "@/presentation/components/Button";
import ConfirmAmount from "@/presentation/components/Confirm/ConfirmAmount";
import { AlertDialog } from "@/presentation/components/Dialog";
import { BottomInputDrawer } from "@/presentation/components/Drawer";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import QRCode, { QRCodeHandle } from "@/presentation/components/QRCode";
import { ErrorText } from "@/presentation/components/Text";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { Token } from "@/registries/ChainTokenRegistry";

type ReceiveConfirmProps = {
  recipient: Address;
  amount: number;
  sendToken: Token;
  feeToken: Token;
  feeDisplayValue: number;
  webhookUrl: string | undefined;
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
};

const ReceiveConfirm = (props: ReceiveConfirmProps) => {
  const { recipient, amount, sendToken, feeToken, feeDisplayValue, webhookUrl, componentProps } = props;

  const { currentChain: chain } = useWalletPreferencesContext();
  const [isShowErrorDialog, setIsShowErrorDialog] = useBoolean(false);

  const qrCodeRef = useRef<QRCodeHandle | null>(null);

  const handleShareInvoice = useCallback(async () => {
    try {
      await qrCodeRef.current?.handleShare();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <BottomInputDrawer {...componentProps}>
        <VStack className="w-full justify-between flex-1">
          <VStack className="w-full items-center gap-y-7">
            <ConfirmAmount
              title="請求額・手数料"
              amount={amount}
              sendToken={sendToken}
              feeToken={feeToken}
              feeDisplayValue={feeDisplayValue}
            />
            <QRCode
              ref={qrCodeRef}
              path="transfer"
              query={{ chain, sendToken, feeToken, recipient, amount, webhookUrl }}
              size={275}
            />
          </VStack>
          <HStack className="gap-x-4">
            <SubContainButton text="戻る" size="lg" className="flex-1" onPress={componentProps.onClose} />
            <ContainButton text="共有" size="lg" className="flex-1" onPress={handleShareInvoice} />
          </HStack>
        </VStack>
      </BottomInputDrawer>

      <AlertDialog title="QRコード共有の失敗" isOpen={isShowErrorDialog} onClose={setIsShowErrorDialog.off} size="lg">
        <VStack className="py-4 gap-y-2">
          <ErrorText>不明なエラーによりQRコードの共有に失敗しました。</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default ReceiveConfirm;
