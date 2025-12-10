import { useStore } from "@tanstack/react-form";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { ContainButton } from "@/presentation/components/Button";
import { AlertDialog } from "@/presentation/components/Dialog";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText } from "@/presentation/components/Text";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import useMutateAddressForm, { type UseMutateAddressFormProps } from "@/presentation/hooks/useMutateAddressForm";

import AddressMutateFieldForm from "./AddressMutateFieldForm";

type AddressMutateFieldProps = UseMutateAddressFormProps & {
  componentProps: Omit<React.ComponentProps<typeof BottomActionSheet>, "children">;
  disableFields?: ("name" | "address")[];
  refetch?: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
};

const AddressMutateField = (props: AddressMutateFieldProps) => {
  const { componentProps, disableFields, refetch: refetchAddresses, ...rest } = props;
  const { form, defaultValues } = useMutateAddressForm(rest);

  const errors = useStore(form.store, s =>
    s.errors
      .filter(f => !!f)
      .map(m => Object.values(m))
      .flat()
      .flatMap(m => m.map(m => m.message))
  );
  const isSubmitting = useStore(form.store, s => s.isSubmitting);
  const isDefault = useStore(form.store, s => {
    if (rest.mode === "create")
      return Object.entries(s.fieldMeta).some(([key, value]) => {
        if (defaultValues[key as "address" | "name"]) return false;
        return value.isDefaultValue;
      });
    return s.isDefaultValue;
  });

  const [isShowErrorDialog, setIsShowErrorDialog] = useBoolean(false);

  const handleClose = useCallback(() => {
    form.reset();
    componentProps.onClose();
  }, [componentProps, form]);

  const handleSubmit = useCallback(async () => {
    if (errors.length > 0) {
      setIsShowErrorDialog.on();
      return;
    }
    await form.handleSubmit().finally(() => {
      const isValid = form.state.isValid;
      if (!isValid) {
        setIsShowErrorDialog.on();
        return;
      }

      if (refetchAddresses) refetchAddresses();

      componentProps.onClose();
    });
  }, [componentProps, errors.length, form, refetchAddresses, setIsShowErrorDialog]);

  return (
    <>
      <BottomActionSheet {...componentProps} onClose={handleClose}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
        >
          <VStack className="flex-1 w-full justify-between py-4">
            <AddressMutateFieldForm form={form} disableFields={disableFields} />
            <ContainButton
              text="確定"
              size="lg"
              onPress={handleSubmit}
              isDisabled={isDefault}
              isLoading={isSubmitting}
            />
          </VStack>
        </KeyboardAwareScrollView>
      </BottomActionSheet>

      <AlertDialog title="入力不正" isOpen={isShowErrorDialog} onClose={setIsShowErrorDialog.off} size="lg">
        <VStack className="py-4 gap-y-2">
          {errors.map((error, index) => (
            <ErrorText key={`recipient-error-${index}`}>{error}</ErrorText>
          ))}
        </VStack>
      </AlertDialog>
    </>
  );
};

export default AddressMutateField;
