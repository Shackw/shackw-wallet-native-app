import { useStore } from "@tanstack/react-form";
import { ViewProps } from "react-native";

import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { toAllowedStr } from "@/shared/helpers/tokenUnits";

import { TransferFormContextType } from "../../_hooks/useTransferForm";

type TransferAmountSummaryProps = {
  display: "sendable" | "fee" | "both";
  transferForm: TransferFormContextType;
  className?: ViewProps["className"];
};

const TransferAmountSummary = (props: TransferAmountSummaryProps) => {
  const { display, transferForm, className } = props;
  const { form, sendToken, maxSendable, fee } = transferForm;
  const feeToken = useStore(form.baseStore, s => s.values.feeToken);

  return (
    <VStack className={`w-full bg-white ${className}`}>
      {["sendable", "both"].includes(display) && (
        <HStack className="w-full h-[50px] items-center justify-between gap-x-5">
          <Text size="md" className="font-bold text-secondary-600 ">
            送金可能額
          </Text>
          <Text size="lg" className="flex-1 font-bold text-right">
            {`${toAllowedStr(maxSendable, sendToken)} ${sendToken}`}
          </Text>
        </HStack>
      )}
      {["fee", "both"].includes(display) && (
        <HStack className="w-full h-[50px] items-center justify-between gap-x-5">
          <Text size="md" className="font-bold text-secondary-600 ">
            手数料
          </Text>
          <Text size="lg" className="flex-1 font-bold text-right">
            {fee ? `${fee.display} ${feeToken}` : "ー"}
          </Text>
        </HStack>
      )}
    </VStack>
  );
};

export default TransferAmountSummary;
