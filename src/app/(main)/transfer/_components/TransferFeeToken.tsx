import { ChevronDownIcon } from "lucide-react-native";

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
import { TOKENS } from "@/registries/ChainTokenRegistry";

import useTransferForm from "../_hooks/useTransferForm";

const TransferFeeToken = () => {
  const { form } = useTransferForm();

  return (
    <HStack className="w-full px-4 py-3 h-[90px] bg-white items-center justify-between gap-x-5">
      <Text size="xl" className="font-bold text-secondary-700 ">
        手数料通貨
      </Text>
      <form.Field
        name="feeToken"
        children={field => (
          <Select selectedValue={field.state.value} onValueChange={field.handleChange}>
            <SelectTrigger variant="underlined" size="xl">
              <SelectInput placeholder="Select option" className="w-[100px] text-center" />
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {TOKENS.map(token => (
                  <SelectItem
                    key={token}
                    label={token}
                    value={token}
                    className="py-6"
                    textStyle={{ bold: true, size: "xl" }}
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
