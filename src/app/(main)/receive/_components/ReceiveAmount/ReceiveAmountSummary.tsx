import { useStore } from "@tanstack/react-form";
import { ViewProps } from "react-native";

import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";

import { ReceiveFormContextType } from "../../_hooks/useReceiveForm";

type ReceiveAmountSummaryProps = {
  display: "sendable" | "fee" | "both";
  transferForm: ReceiveFormContextType;
  className?: ViewProps["className"];
};

const ReceiveAmountSummary = (props: ReceiveAmountSummaryProps) => {
  const { display, transferForm, className } = props;
  const { form, fee } = transferForm;
  const feeToken = useStore(form.baseStore, s => s.values.feeToken);

  return (
    <VStack className={`w-full bg-white ${className}`}>
      {["fee", "both"].includes(display) && (
        <HStack className="w-full h-[50px] items-center justify-between gap-x-5">
          <Text size="md" className="font-bold text-secondary-600 ">
            手数料
          </Text>
          <Text size="lg" className="flex-1 font-bold text-right">
            {fee ? `${fee.feeDisplayValue} ${feeToken}` : "ー"}
          </Text>
        </HStack>
      )}
    </VStack>
  );
};

export default ReceiveAmountSummary;
