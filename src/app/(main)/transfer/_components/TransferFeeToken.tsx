import { ChevronDownIcon } from "lucide-react-native";

import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem
} from "@/presentation/components/gluestack-ui/select";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { useTw } from "@/presentation/styles/tw";
import { SUPPORT_CHAIN_TO_TOKEN } from "@/registries/ChainTokenRegistry";
import { cn } from "@/shared/helpers/cn";

import useTransferForm from "../_hooks/useTransferForm";

const TransferFeeToken = () => {
  const tw = useTw();
  const { form } = useTransferForm();
  const { currentChain } = useWalletPreferencesContext();

  return (
    <HStack
      className={cn("w-full", tw.px(4), tw.py(3), tw.h(24), "bg-white", "items-center", "justify-between", tw.gapX(5))}
    >
      <AppText t="lg" className="font-bold text-secondary-700">
        手数料通貨
      </AppText>

      <form.Field
        name="feeToken"
        children={field => (
          <Select selectedValue={field.state.value} onValueChange={field.handleChange}>
            <SelectTrigger variant="underlined" size={tw.input("lg")}>
              <SelectInput placeholder="Select option" className={cn(tw.w(32), "text-center")} />
              <SelectIcon className={cn(tw.mr(3))} as={ChevronDownIcon} />
            </SelectTrigger>

            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>

                {SUPPORT_CHAIN_TO_TOKEN[currentChain].map(token => (
                  <SelectItem
                    key={token}
                    label={token}
                    value={token}
                    className={tw.py(6)}
                    textStyle={{ bold: true, className: tw.text("lg") }}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        )}
      ></form.Field>
    </HStack>
  );
};

export default TransferFeeToken;
