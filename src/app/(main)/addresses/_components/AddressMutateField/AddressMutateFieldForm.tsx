import { Address } from "viem";

import { normalizeNameInput, normalizeAddressInput } from "@/helpers/normalize";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/vendor/gluestack-ui/form-control";
import { Input, InputField } from "@/vendor/gluestack-ui/input";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useMutateAddressForm from "../../_hooks/useMutateAddressForm";

type AddressMutateFieldFormProps = { form: ReturnType<typeof useMutateAddressForm> };

const AddressMutateFieldForm = (props: AddressMutateFieldFormProps) => {
  const { form } = props;
  return (
    <VStack className="gap-y-5">
      <form.Field
        name="name"
        children={field => (
          <VStack className="w-full">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>名前</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg" className="px-2 rounded-xl h-14">
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

      <form.Field
        name="address"
        children={field => (
          <VStack className="w-full">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>アドレス</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg" className="px-2 rounded-xl h-14">
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
    </VStack>
  );
};

export default AddressMutateFieldForm;
