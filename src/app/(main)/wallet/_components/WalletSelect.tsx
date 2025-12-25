import { ChevronDownIcon } from "lucide-react-native";
import { useCallback } from "react";
import { Address } from "viem";

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
  SelectItem,
  SelectScrollView
} from "@/presentation/components/gluestack-ui/select";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import { AddressOption } from "../_hooks/useMyAddressOptions";
import useSelectNetworkForm from "../_hooks/useSelectWalletForm";

type WalletSelectProps = {
  initialValue: AddressOption;
  options: AddressOption[];
};

const WalletSelect = (props: WalletSelectProps) => {
  const tw = useTw();
  const {
    initialValue: { label },
    options
  } = props;

  const {
    form: { inputWallet, setInputWallet }
  } = useSelectNetworkForm();

  const handleChange = useCallback(
    (arg: string) => {
      setInputWallet(arg as Address);
    },
    [setInputWallet]
  );

  return (
    <HStack
      className={cn("w-full", tw.px(4), tw.py(3), tw.h(24), "bg-white", "items-center", "justify-between", tw.gapX(5))}
    >
      <AppText t="lg" className="font-bold text-secondary-700">
        ウォレット
      </AppText>

      <Select initialLabel={label} selectedValue={inputWallet} onValueChange={handleChange}>
        <SelectTrigger variant="underlined" size={tw.input("lg")}>
          <SelectInput placeholder="Select option" className={cn(tw.w(60), "text-center", tw.px(1))} />
          <SelectIcon className={cn(tw.mr(3))} as={ChevronDownIcon} />
        </SelectTrigger>

        <SelectPortal>
          <SelectBackdrop />
          <SelectContent className={cn(tw.maxH(96))}>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>

            <SelectScrollView showsVerticalScrollIndicator={false}>
              {options.map(o => (
                <SelectItem
                  key={o.value}
                  label={o.label}
                  value={o.value}
                  className={tw.py(6)}
                  textStyle={{ bold: true, className: tw.text("lg") }}
                />
              ))}
            </SelectScrollView>
          </SelectContent>
        </SelectPortal>
      </Select>
    </HStack>
  );
};

export default WalletSelect;
