import { useStore } from "@tanstack/react-form";
import { useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Address } from "viem";

import { ContainButton } from "@/components/Button";
import { AlertDialog } from "@/components/Dialog";
import { BottomInputDrawer } from "@/components/Drawer";
import { ErrorText } from "@/components/Text";
import { normalizeAddressInput, normalizeNameInput } from "@/helpers/normalize";
import { useBoolean } from "@/hooks/useBoolean";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/vendor/gluestack-ui/form-control";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Input, InputField } from "@/vendor/gluestack-ui/input";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useMutateAddressForm, { type UseMutateAddressFormProps } from "../_hooks/useMutateAddressForm";

type AddressMutateFieldProps = UseMutateAddressFormProps & {
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
};

const AddressMutateField = (props: AddressMutateFieldProps) => {
  const { componentProps, ...rest } = props;
  const form = useMutateAddressForm(rest);

  const formErrors = useStore(form.store, s => s.errors);
  const isDedault = useStore(form.store, s => s.isDefaultValue);
  const isSubmitting = useStore(form.store, s => s.isSubmitting);

  const [isShowErrorDialog, setIsShowErrorDialog] = useBoolean(false);

  const handleSubmit = useCallback(async () => {
    if (formErrors.length > 0) {
      console.log(JSON.stringify(formErrors));
      setIsShowErrorDialog.on();
      return;
    }
    await form.handleSubmit();
  }, [form, formErrors, setIsShowErrorDialog]);

  return (
    <>
      <BottomInputDrawer {...componentProps}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
        >
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

          <HStack className="gap-x-4 mt-auto">
            <ContainButton
              text="確定"
              size="lg"
              className="flex-1"
              onPress={handleSubmit}
              isDisabled={isDedault}
              isLoading={isSubmitting}
            />
          </HStack>
        </KeyboardAwareScrollView>
      </BottomInputDrawer>

      <AlertDialog title="入力不正" isOpen={isShowErrorDialog} onClose={setIsShowErrorDialog.off} size="lg">
        <VStack className="py-4 gap-y-1">
          {formErrors
            .filter(err => !!err)
            .map(f => Object.values(f))
            .flat()
            .map((error, index) => (
              <ErrorText key={`recipient-error-${index}`} className="flex-1">
                {error.map(e => e.message).join("\n")}
              </ErrorText>
            ))}
        </VStack>
      </AlertDialog>
    </>
  );
};

export default AddressMutateField;
