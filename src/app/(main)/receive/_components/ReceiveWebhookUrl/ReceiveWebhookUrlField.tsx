import { useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { SubContainButton, ContainButton } from "@/components/Button";
import { AlertDialog } from "@/components/Dialog";
import { BottomInputDrawer } from "@/components/Drawer";
import { ErrorText, InfoText } from "@/components/Text";
import { useBoolean } from "@/hooks/useBoolean";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Textarea, TextareaInput } from "@/vendor/gluestack-ui/textarea";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import { ReceiveFormContextType } from "../../_hooks/useReceiveForm";

type ReceiveWebhookUrlFieldProps = {
  prevValue: string | undefined;
  transferForm: ReceiveFormContextType;
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
};

const ReceiveWebhookUrlField = (props: ReceiveWebhookUrlFieldProps) => {
  const { prevValue, transferForm, componentProps } = props;

  const { form } = transferForm;
  const [isShowErrorDialog, setIsShowErrorDialog] = useBoolean(false);

  const handleClose = useCallback(() => {
    form.setFieldValue("webhookUrl", prevValue ? prevValue.toString() : undefined);
    componentProps.onClose();
  }, [componentProps, form, prevValue]);

  const handleClear = useCallback(() => {
    const isDefaultValue = form.getFieldMeta("webhookUrl")?.isDefaultValue ?? true;
    form.resetField("webhookUrl");
    if (isDefaultValue) componentProps.onClose();
  }, [componentProps, form]);

  const handleSubmit = useCallback(() => {
    if (!form.state.fieldMeta.webhookUrl.isValid) {
      setIsShowErrorDialog.on();
      return;
    }
    componentProps.onClose();
  }, [componentProps, form, setIsShowErrorDialog]);

  return (
    <BottomInputDrawer {...componentProps} onClose={handleClose}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
        <form.Field
          name="webhookUrl"
          children={field => (
            <>
              <VStack className="justify-between flex-1 py-4">
                <VStack className="w-full items-center gap-y-4">
                  <Textarea size="lg" className="p-2 rounded-xl h-32">
                    <TextareaInput
                      inputMode="text"
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="通知用URLを入力してください"
                      value={field.state.value}
                      onChangeText={e => field.handleChange(e.trim())}
                      onBlur={field.handleBlur}
                    />
                  </Textarea>
                  <InfoText className="flex-1">
                    通知用URLを設定することで支払い完了通知を受け取ることができます。
                  </InfoText>
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

              <AlertDialog
                title="通知用URL入力不正"
                isOpen={isShowErrorDialog}
                onClose={setIsShowErrorDialog.off}
                size="lg"
              >
                <VStack className="py-4 gap-y-1">
                  {field.state.meta.errors.map((error, index) => (
                    <ErrorText key={`amount-error-${index}`} className="flex-1">
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

export default ReceiveWebhookUrlField;
