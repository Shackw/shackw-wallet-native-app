import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Address } from "viem";

import BackDrop from "@/presentation/components/BackDrop";
import { ContainButton, SubContainButton } from "@/presentation/components/Button";
import ConfirmAmount from "@/presentation/components/Confirm/ConfirmAmount";
import ConfirmRecipient from "@/presentation/components/Confirm/ConfirmRecipient";
import { AlertDialog } from "@/presentation/components/Dialog";
import { BottomInputDrawer } from "@/presentation/components/Drawer";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";
import { useTransferToken } from "@/presentation/hooks/mutations/useTransferToken";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { Token } from "@/registries/ChainTokenRegistry";

type TransferConfirmProps = {
  name: string | undefined;
  recipient: Address;
  amount: number;
  sendToken: Token;
  feeToken: Token;
  feeDecimals: number;
  webhookUrl?: string;
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
};

const TransferConfirm = (props: TransferConfirmProps) => {
  const { name, recipient, amount, sendToken, feeToken, feeDecimals, webhookUrl, componentProps } = props;

  const router = useRouter();
  const { account, client } = useShackwWalletContext();
  const [isTransferring, setIsTransferring] = useBoolean(false);

  const { mutate, error, isSuccess } = useTransferToken({ onSettled: setIsTransferring.off });

  const handleTransfer = useCallback(async () => {
    if (!account || !client) return;
    setIsTransferring.on();
    mutate({
      account,
      client,
      token: sendToken,
      feeToken: feeToken as Token,
      amountDecimals: Number(amount),
      recipient: recipient as Address,
      webhookUrl
    });
  }, [account, amount, client, feeToken, mutate, recipient, sendToken, setIsTransferring, webhookUrl]);

  const handleCloseSuccess = useCallback(() => {
    componentProps.onClose();
    setIsTransferring.off();
    router.push("/");
  }, [componentProps, router, setIsTransferring]);

  return (
    <>
      <BottomInputDrawer {...componentProps}>
        <VStack className="w-full justify-between flex-1">
          <VStack className="w-full items-center gap-y-7">
            <Text size="md" className="text-center font-bold text-secondary-700">
              {"以下の内容で送金します。\n問題なければ送金ボタンを押してください。"}
            </Text>
            <ConfirmRecipient title="振込先情報" name={name} address={recipient} />
            <ConfirmAmount
              title="送金額・手数料"
              amount={amount}
              sendToken={sendToken}
              feeToken={feeToken}
              feeDecimals={feeDecimals}
            />
            {error && <ErrorText>{error.message}</ErrorText>}
          </VStack>
          <HStack className="gap-x-4">
            <SubContainButton text="戻る" size="lg" className="flex-1" onPress={componentProps.onClose} />
            <ContainButton
              text="送金"
              size="lg"
              className="flex-1"
              onPress={handleTransfer}
              isLoading={isTransferring}
            />
          </HStack>
        </VStack>
      </BottomInputDrawer>

      <BackDrop visible={isTransferring} />
      <AlertDialog title="送金完了" isOpen={isSuccess && componentProps.isOpen} onClose={handleCloseSuccess} size="lg">
        <VStack className="py-4 gap-y-1">
          <InfoText>送金が完了しました。</InfoText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default TransferConfirm;
