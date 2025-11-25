import { useStore } from "@tanstack/react-form";
import { Address } from "viem";

import { ContainButton } from "@/presentation/components/Button";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";
import useAddressesRow from "@/presentation/hooks/useAddressesRow";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { Token } from "@/registries/ChainTokenRegistry";

import useTransferForm from "../_hooks/useTransferForm";

import TransferConfirm from "./TransferConfirm";

const TransferSubmitButton = () => {
  const transferForm = useTransferForm();
  const { form, sendToken, fee, isValid, insuff } = transferForm;

  const { addressToName } = useAddressesRow();
  const [isConfirming, setIsConfirming] = useBoolean(false);

  const amount = useStore(form.baseStore, s => {
    const v = s.values.amount;
    return v === "" ? 0 : Number(v);
  });
  const feeToken = useStore(form.baseStore, s => s.values.feeToken as Token);
  const recipient = useStore(form.baseStore, s => s.values.recipient as Address);
  const webhookUrl = useStore(form.baseStore, s => s.values.webhookUrl);

  return (
    <>
      <VStack className="px-4 pt-5 gap-y-5">
        {insuff.insufficient && insuff.message ? (
          <ErrorText>{insuff.message}</ErrorText>
        ) : (
          <InfoText>必要項目を入力すると手数料を自動計算します。</InfoText>
        )}
        <ContainButton
          text="確認画面へ"
          size="lg"
          isLoading={isValid && !fee}
          isDisabled={!isValid || insuff.insufficient}
          onPress={setIsConfirming.on}
          className="w-full mx-auto"
        />
      </VStack>
      <TransferConfirm
        name={addressToName[recipient.toLowerCase()]}
        recipient={recipient}
        amount={amount}
        sendToken={sendToken}
        feeToken={feeToken}
        feeDisplyValue={fee?.display ?? 0}
        webhookUrl={webhookUrl}
        componentProps={{ title: "内容確認", size: "lg", isOpen: isConfirming, onClose: setIsConfirming.off }}
      />
    </>
  );
};

export default TransferSubmitButton;
