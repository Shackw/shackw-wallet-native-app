import { NotepadText } from "lucide-react-native";
import { useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { SubContainButton, ContainButton } from "@/presentation/components/Button";
import { AlertDialog } from "@/presentation/components/Dialog";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Input, InputSlot, InputIcon, InputField } from "@/presentation/components/gluestack-ui/input";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText } from "@/presentation/components/Text";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import type { TransferFormContextType } from "../../_hooks/useTransferForm";

type TransferRecipientDirectFormProps = { form: TransferFormContextType["form"]; handleClose: () => void };

const TransferRecipientDirectForm = (props: TransferRecipientDirectFormProps) => {
  const tw = useTw();
  const { form, handleClose } = props;
  const [isShowErrorDialog, setIsShowErrorDialog] = useBoolean(false);

  const handleClear = useCallback(() => {
    const isDefaultValue = form.getFieldMeta("recipient")?.isDefaultValue ?? true;
    form.resetField("recipient");
    if (isDefaultValue) handleClose();
  }, [form, handleClose]);

  const handleSubmit = useCallback(() => {
    if (!form.state.fieldMeta?.recipient?.isValid) {
      setIsShowErrorDialog.on();
      return;
    }
    handleClose();
  }, [form, handleClose, setIsShowErrorDialog]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      enableOnAndroid={true}
      showsVerticalScrollIndicator={false}
      extraScrollHeight={30}
    >
      <VStack className={cn(["w-full flex-1 items-center justify-between"])}>
        <form.Field
          name="recipient"
          children={field => (
            <>
              <VStack className={cn("w-full", "flex-1", "justify-between", tw.gapY(5))}>
                <Input size={tw.input("lg")} className={cn(tw.px(2), "rounded-xl", tw.h(14))}>
                  <InputSlot>
                    <InputIcon as={NotepadText} />
                  </InputSlot>
                  <InputField
                    inputMode="text"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="宛先を入力してください"
                    value={field.state.value}
                    onChangeText={e => field.handleChange(e)}
                    onBlur={field.handleBlur}
                  />
                </Input>
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

              <AlertDialog title="宛先入力不正" isOpen={isShowErrorDialog} onClose={setIsShowErrorDialog.off} size="lg">
                <VStack className={cn(tw.py(4), tw.gapY(1))}>
                  {field.state.meta.errors.map((error, index) => (
                    <ErrorText key={`recipient-error-${index}`}>{error?.message}</ErrorText>
                  ))}
                </VStack>
              </AlertDialog>
            </>
          )}
        />
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default TransferRecipientDirectForm;
