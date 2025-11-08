import { ChevronDownIcon } from "lucide-react-native";
import { useCallback } from "react";
import { Address } from "viem";

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
import { Text } from "@/presentation/components/gluestack-ui/text";

import { AddressOption } from "../_hooks/useMyAddressOptions";
import useSelectNetworkForm from "../_hooks/useSelectWalletForm";

type WalletSelectProps = {
  initialValue: AddressOption;
  options: AddressOption[];
};

const WalletSelect = (props: WalletSelectProps) => {
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
    <HStack className="w-full px-4 py-3 h-[90px] bg-white items-center justify-between gap-x-5">
      <Text size="xl" className="font-bold text-secondary-700 ">
        ウォレット
      </Text>
      <Select initialLabel={label} selectedValue={inputWallet} onValueChange={handleChange}>
        <SelectTrigger variant="underlined" size="lg">
          <SelectInput placeholder="Select option" className="w-[240px] text-center px-1" />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {options.map(o => (
              <SelectItem
                key={o.value}
                label={o.label}
                value={o.value}
                className="py-6"
                textStyle={{ bold: true, size: "lg" }}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </HStack>
  );
};

export default WalletSelect;
