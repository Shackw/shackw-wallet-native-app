import { useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { SubContainButton, ContainButton } from "@/presentation/components/Button";
import { AlertDialog } from "@/presentation/components/Dialog";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Textarea, TextareaInput } from "@/presentation/components/gluestack-ui/textarea";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import { ReceiveFormContextType } from "../../_hooks/useReceiveForm";

type ReceiveWebhookUrlFieldProps = {
  prevValue: string | undefined;
  transferForm: ReceiveFormContextType;
  componentProps: Omit<React.ComponentProps<typeof BottomActionSheet>, "children">;
};

const ReceiveWebhookUrlField = (props: ReceiveWebhookUrlFieldProps) => {
  const tw = useTw();
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
    if (!form.state.fieldMeta?.webhookUrl?.isValid) {
      setIsShowErrorDialog.on();
      return;
    }
    componentProps.onClose();
  }, [componentProps, form, setIsShowErrorDialog]);

  return (
    <BottomActionSheet {...componentProps} onClose={handleClose}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={30}
      >
        <form.Field
          name="webhookUrl"
          children={field => (
            <>
              <VStack className={cn("justify-between", "flex-1", tw.py(4))}>
                <VStack className={cn("w-full", "items-center", tw.gapY(4))}>
                  <Textarea size={tw.input("lg")} className={cn(tw.p(2), "rounded-xl", tw.h(32))}>
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
                  <InfoText>{`通知用URLを設定することで支払い完了通知を受け取ることができます。`}</InfoText>
                </VStack>
                <HStack className={tw.gapX(4)}>
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
                <VStack className={cn(tw.py(4), tw.gapY(1))}>
                  {field.state.meta.errors.map((error, index) => (
                    <ErrorText key={`amount-error-${index}`}>{error?.message}</ErrorText>
                  ))}
                </VStack>
              </AlertDialog>
            </>
          )}
        />
      </KeyboardAwareScrollView>
    </BottomActionSheet>
  );
};

export default ReceiveWebhookUrlField;
