import { ChevronDownIcon } from "lucide-react-native";
import { useCallback } from "react";

import { CHAIN_KEY_TO_DISPLAY_NAME, Chain } from "@/config/chain";
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
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import useSelectNetworkForm from "../_hooks/useSelectNetworkForm";

const NetworkSelect = () => {
  const tw = useTw();
  const {
    form: { inputChain, setInputChain }
  } = useSelectNetworkForm();

  const handleChange = useCallback(
    (arg: string) => {
      setInputChain(arg as Chain);
    },
    [setInputChain]
  );

  return (
    <HStack
      className={cn("w-full", tw.px(4), tw.py(3), tw.h(24), "bg-white", "items-center", "justify-between", tw.gapX(5))}
    >
      <AppText t="lg" className="font-bold text-secondary-700">
        ネットワーク
      </AppText>
      <Select
        initialLabel={CHAIN_KEY_TO_DISPLAY_NAME[inputChain]}
        selectedValue={inputChain}
        onValueChange={handleChange}
      >
        <SelectTrigger variant="underlined" size={tw.input("lg")}>
          <SelectInput placeholder="Select option" className={cn(["text-center", tw.w(48)])} />
          <SelectIcon className={cn(tw.mr(3))} as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {Object.entries(CHAIN_KEY_TO_DISPLAY_NAME).map(([key, label]) => (
              <SelectItem
                key={key}
                label={label}
                value={key}
                className={cn(tw.py(6))}
                textStyle={{ bold: true, className: tw.text("lg") }}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </HStack>
  );
};

export default NetworkSelect;
