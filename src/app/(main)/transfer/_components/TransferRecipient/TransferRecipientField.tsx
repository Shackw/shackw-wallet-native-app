import { NotepadText } from "lucide-react-native";
import { useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ContainButton, SubContainButton } from "@/components/Button";
import { AlertDialog } from "@/components/Dialog";
import { BottomInputDrawer } from "@/components/Drawer";
import { ErrorText } from "@/components/Text";
import { useBoolean } from "@/hooks/useBoolean";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/vendor/gluestack-ui/input";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import { TransferFormContextType } from "../../_hooks/useTransferForm";

type TransferRecipientFieldProps = {
  prevValue: string;
  transferForm: TransferFormContextType;
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
};

const TransferRecipientField = (props: TransferRecipientFieldProps) => {
  const { prevValue, transferForm, componentProps } = props;
  const { form } = transferForm;
  const [isShowErrorDialog, setIsShowErrorDialog] = useBoolean(false);

  const handleClose = useCallback(() => {
    form.setFieldValue("recipient", prevValue);
    componentProps.onClose();
  }, [componentProps, form, prevValue]);

  const handleClear = useCallback(() => {
    const isDefaultValue = form.getFieldMeta("recipient")?.isDefaultValue ?? true;
    form.resetField("recipient");
    if (isDefaultValue) componentProps.onClose();
  }, [componentProps, form]);

  const handleSubmit = useCallback(() => {
    if (!form.state.fieldMeta.recipient.isValid) {
      setIsShowErrorDialog.on();
      return;
    }
    componentProps.onClose();
  }, [componentProps, form, setIsShowErrorDialog]);

  return (
    <BottomInputDrawer {...componentProps} onClose={handleClose}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
        <form.Field
          name="recipient"
          children={field => (
            <>
              <VStack className="items-center justify-between flex-1 py-4">
                <VStack className="w-full">
                  <Input size="lg" variant="underlined" className="px-2">
                    <InputSlot>
                      <InputIcon as={NotepadText} />
                    </InputSlot>
                    <InputField
                      keyboardType="numbers-and-punctuation"
                      placeholder="宛先を入力してください"
                      textAlign="right"
                      value={field.state.value}
                      onChangeText={e => field.handleChange(e)}
                      onBlur={field.handleBlur}
                    />
                  </Input>
                </VStack>
                <HStack className="gap-x-4">
                  <SubContainButton
                    text={field.state.meta.isDefaultValue ? "閉じる" : "クリア"}
                    size="lg"
                    className="flex-1"
                    onPress={handleClear}
                  />
                  <ContainButton text="確定" size="lg" className="flex-1" onPress={handleSubmit} />
                </HStack>
              </VStack>
              <AlertDialog title="宛先入力不正" isOpen={isShowErrorDialog} onClose={setIsShowErrorDialog.off} size="lg">
                <VStack className="py-4 gap-y-1">
                  {field.state.meta.errors.map((error, index) => (
                    <ErrorText key={`recipient-error-${index}`} className="flex-1">
                      {error?.message}
                    </ErrorText>
                  ))}
                </VStack>
              </AlertDialog>
            </>
          )}
        />
      </KeyboardAwareScrollView>
    </BottomInputDrawer>
  );
};

export default TransferRecipientField;
