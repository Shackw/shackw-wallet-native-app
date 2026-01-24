import {
  FormControl,
  FormControlLabel,
  FormControlLabelText
} from "@/presentation/components/gluestack-ui/form-control";
import { Input, InputField } from "@/presentation/components/gluestack-ui/input";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import { normalizeNameInput, normalizeAddressInput } from "@/shared/helpers/normalize";

import type useMutateAddressForm from "@mainh/useMutateAddressForm";
import type { Address } from "viem";

type AddressMutateFieldFormProps = {
  form: ReturnType<typeof useMutateAddressForm>["form"];
  disableFields?: ("name" | "address")[];
};

const AddressMutateFieldForm = (props: AddressMutateFieldFormProps) => {
  const { form, disableFields = [] } = props;

  const tw = useTw();

  return (
    <VStack className={cn(tw.gapY(5))}>
      <form.Field
        name="address"
        children={field => (
          <VStack className="w-full">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText className={tw.text("md")}>アドレス</FormControlLabelText>
              </FormControlLabel>
              <Input
                size={tw.input("lg")}
                className={cn(tw.px(2), "rounded-xl", tw.h(14))}
                isDisabled={disableFields.includes("address")}
              >
                <InputField
                  inputMode="text"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="アドレスを入力してください"
                  value={field.state.value}
                  onChangeText={v => field.handleChange(v)}
                  onBlur={() => {
                    field.handleBlur();
                    const nv = normalizeAddressInput(field.state.value ?? "");
                    if (nv !== field.state.value) {
                      form.setFieldValue(field.name, nv as Address);
                    }
                  }}
                  returnKeyType="done"
                />
              </Input>
            </FormControl>
          </VStack>
        )}
      />

      <form.Field
        name="name"
        children={field => (
          <VStack className="w-full">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText className={`${tw.text("md")}`}>名前</FormControlLabelText>
              </FormControlLabel>
              <Input
                size={tw.input("lg")}
                className={cn(tw.px(2), "rounded-xl", tw.h(14))}
                isDisabled={disableFields.includes("name")}
              >
                <InputField
                  inputMode="text"
                  autoCapitalize="none"
                  placeholder="名前を入力してください"
                  value={field.state.value}
                  onChangeText={v => field.handleChange(v)}
                  onBlur={() => {
                    field.handleBlur();
                    const nv = normalizeNameInput(field.state.value ?? "");
                    if (nv !== field.state.value) {
                      form.setFieldValue(field.name, nv);
                    }
                  }}
                  returnKeyType="next"
                />
              </Input>
            </FormControl>
          </VStack>
        )}
      />
    </VStack>
  );
};

export default AddressMutateFieldForm;
