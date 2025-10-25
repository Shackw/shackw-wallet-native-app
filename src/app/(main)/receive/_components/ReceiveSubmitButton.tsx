import { useStore } from "@tanstack/react-form";
import { Address } from "viem";

import { ContainButton } from "@/components/Button";
import { InfoText } from "@/components/Text";
import { useBoolean } from "@/hooks/useBoolean";
import { Token } from "@/registries/TokenRegistry";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useReceiveForm from "../_hooks/useReceiveForm";

import ReceiveConfirm from "./ReceiveConfirm";

type ReceiveSubmitButtonProps = { recipient: Address };

const ReceiveSubmitButton = (props: ReceiveSubmitButtonProps) => {
  const { recipient } = props;
  const transferForm = useReceiveForm();
  const { form, sendToken, fee, isValid } = transferForm;

  const [isSharing, setIsSharing] = useBoolean(false);

  const amount = useStore(form.baseStore, s => {
    const v = s.values.amount;
    return v === "" ? 0 : Number(v);
  });
  const feeToken = useStore(form.baseStore, s => s.values.feeToken as Token);
  const webhookUrl = useStore(form.baseStore, s => s.values.webhookUrl);

  return (
    <>
      <VStack className="px-4 pt-5 gap-y-5">
        <InfoText>必要項目を入力すると手数料を自動計算します。</InfoText>
        <ContainButton
          text="QRコードを作成"
          size="lg"
          isLoading={isValid && !fee}
          isDisabled={!isValid}
          onPress={setIsSharing.on}
          className="w-full mx-auto"
        />
      </VStack>

      <ReceiveConfirm
        recipient={recipient}
        amount={amount}
        sendToken={sendToken}
        feeToken={feeToken}
        feeDecimals={fee?.feeDecimals ?? 0}
        webhookUrl={webhookUrl}
        componentProps={{ title: "請求リンクの共有", size: "lg", isOpen: isSharing, onClose: setIsSharing.off }}
      />
    </>
  );
};

export default ReceiveSubmitButton;
