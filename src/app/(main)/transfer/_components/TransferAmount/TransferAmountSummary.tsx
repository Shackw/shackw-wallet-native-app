import { useStore } from "@tanstack/react-form";
import { ViewProps } from "react-native";

import { toAllowedStr } from "@/helpers/tokenUnits";
import { Token } from "@/registries/TokenRegistry";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

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
            {fee ? `${toAllowedStr(fee.feeDecimals, feeToken as Token)} ${feeToken}` : "ー"}
          </Text>
        </HStack>
      )}
    </VStack>
  );
};

export default TransferAmountSummary;
