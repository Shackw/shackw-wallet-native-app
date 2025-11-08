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

import { TransferFormContextType } from "../../_hooks/useTransferForm";

type TransferRecipientDirectFormProps = { form: TransferFormContextType["form"]; handleClose: () => void };

const TransferRecipientDirectForm = (props: TransferRecipientDirectFormProps) => {
  const { form, handleClose } = props;
  const [isShowErrorDialog, setIsShowErrorDialog] = useBoolean(false);

  const handleClear = useCallback(() => {
    const isDefaultValue = form.getFieldMeta("recipient")?.isDefaultValue ?? true;
    form.resetField("recipient");
    if (isDefaultValue) handleClose();
  }, [form, handleClose]);

  const handleSubmit = useCallback(() => {
    if (!form.state.fieldMeta.recipient.isValid) {
      setIsShowErrorDialog.on();
      return;
    }
    handleClose();
  }, [form, handleClose, setIsShowErrorDialog]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} enableOnAndroid={true}>
      <VStack className="w-full flex-1 items-center justify-between">
        <form.Field
          name="recipient"
          children={field => (
            <>
              <VStack className="w-full flex-1 justify-between">
                <Input size="lg" className="px-2 rounded-xl h-14">
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
