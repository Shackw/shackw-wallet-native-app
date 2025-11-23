import { ChevronDownIcon } from "lucide-react-native";
import { useCallback } from "react";

import { CHAIN_KEY_TO_DISPLAY_NAME, Chain } from "@/config/chain";
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

import useSelectNetworkForm from "../_hooks/useSelectNetworkForm";

const NetworkSelect = () => {
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
    <HStack className="w-full px-4 py-3 h-[90px] bg-white items-center justify-between gap-x-5">
      <Text size="xl" className="font-bold text-secondary-700 ">
        ネットワーク
      </Text>
      <Select
        initialLabel={CHAIN_KEY_TO_DISPLAY_NAME[inputChain]}
        selectedValue={inputChain}
        onValueChange={handleChange}
      >
        <SelectTrigger variant="underlined" size="xl">
          <SelectInput placeholder="Select option" className="w-[150px] text-center" />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {Object.entries(CHAIN_KEY_TO_DISPLAY_NAME).map(([key, label]) => (
              <SelectItem key={key} label={label} value={key} className="py-6" textStyle={{ bold: true, size: "xl" }} />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </HStack>
  );
};

export default NetworkSelect;
