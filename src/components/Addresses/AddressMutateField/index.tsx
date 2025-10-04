import { useStore } from "@tanstack/react-form";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ContainButton } from "@/components/Button";
import { AlertDialog } from "@/components/Dialog";
import { BottomInputDrawer } from "@/components/Drawer";
import { ErrorText } from "@/components/Text";
import { useBoolean } from "@/hooks/useBoolean";
import useMutateAddressForm, { type UseMutateAddressFormProps } from "@/hooks/useMutateAddressForm";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import AddressMutateFieldForm from "./AddressMutateFieldForm";

type AddressMutateFieldProps = UseMutateAddressFormProps & {
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
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
      <BottomInputDrawer {...componentProps} onClose={handleClose}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
        >
          <AddressMutateFieldForm form={form} disableFields={disableFields} />
          <HStack className="gap-x-4 mt-auto">
            <ContainButton
              text="確定"
              size="lg"
              className="flex-1"
              onPress={handleSubmit}
              isDisabled={isDefault}
              isLoading={isSubmitting}
            />
          </HStack>
        </KeyboardAwareScrollView>
      </BottomInputDrawer>

      <AlertDialog title="入力不正" isOpen={isShowErrorDialog} onClose={setIsShowErrorDialog.off} size="lg">
        <VStack className="py-4 gap-y-2">
          {errors.map((error, index) => (
            <ErrorText key={`recipient-error-${index}`} className="flex-1">
              {error}
            </ErrorText>
          ))}
        </VStack>
      </AlertDialog>
    </>
  );
};

export default AddressMutateField;
