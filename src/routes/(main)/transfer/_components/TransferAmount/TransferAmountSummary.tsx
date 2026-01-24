import { useStore } from "@tanstack/react-form";

import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import { toAllowedStr } from "@/shared/helpers/tokenUnits";

import type { TransferFormContextType } from "../../_hooks/useTransferForm";
import type { ViewProps } from "react-native";

type TransferAmountSummaryProps = {
  display: "sendable" | "fee" | "both";
  transferForm: TransferFormContextType;
  className?: ViewProps["className"];
};

const TransferAmountSummary = (props: TransferAmountSummaryProps) => {
  const tw = useTw();
  const { display, transferForm, className } = props;
  const { form, sendToken, maxSendable, fee } = transferForm;
  const feeToken = useStore(form.baseStore, s => s.values.feeToken);

  return (
    <VStack className={cn("w-full bg-white", tw.pt(3), className)}>
      {["sendable", "both"].includes(display) && (
        <HStack className={cn("w-full", tw.h(12), "items-center", "justify-between", tw.gapX(5))}>
          <AppText t="md" className="font-bold text-secondary-600">
            送金可能額
          </AppText>
          <AppText t="lg" className="flex-1 font-bold text-right">
            {`${toAllowedStr(maxSendable, sendToken)} ${sendToken}`}
          </AppText>
        </HStack>
      )}
      {["fee", "both"].includes(display) && (
        <HStack className={cn("w-full", tw.h(12), "items-center", "justify-between", tw.gapX(5))}>
          <AppText t="md" className="font-bold text-secondary-600">
            手数料
          </AppText>
          <AppText t="lg" className="flex-1 font-bold text-right">
            {fee ? `${fee.display} ${feeToken}` : "ー"}
          </AppText>
        </HStack>
      )}
    </VStack>
  );
};

export default TransferAmountSummary;
