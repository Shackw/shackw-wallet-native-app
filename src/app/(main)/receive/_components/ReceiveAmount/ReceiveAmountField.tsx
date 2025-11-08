import { useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { SubContainButton, ContainButton } from "@/presentation/components/Button";
import { AlertDialog } from "@/presentation/components/Dialog";
import { BottomInputDrawer } from "@/presentation/components/Drawer";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Input, InputField, InputSlot } from "@/presentation/components/gluestack-ui/input";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText } from "@/presentation/components/Text";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { theme } from "@/presentation/styles/theme";
import { TOKEN_REGISTRY } from "@/registries/TokenRegistry";

import { ReceiveFormContextType } from "../../_hooks/useReceiveForm";

import ReceiveAmountSummary from "./ReceiveAmountSummary";

type ReceiveAmountFieldProps = {
  prevValue: number | undefined;
  transferForm: ReceiveFormContextType;
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
};

const ReceiveAmountField = (props: ReceiveAmountFieldProps) => {
  const { prevValue, transferForm, componentProps } = props;
  const { form, sendToken, fetchFee } = transferForm;
  const [isShowErrorDialog, setIsShowErrorDialog] = useBoolean(false);

  const TokenSymboIcon = TOKEN_REGISTRY[sendToken].Icon;

  const handleClose = useCallback(() => {
    form.setFieldValue("amount", prevValue ? prevValue.toString() : "");
    componentProps.onClose();
  }, [componentProps, form, prevValue]);

  const handleClear = useCallback(() => {
    const isDefaultValue = form.getFieldMeta("amount")?.isDefaultValue ?? true;
    form.resetField("amount");
    if (isDefaultValue) componentProps.onClose();
  }, [componentProps, form]);

  const handleSubmit = useCallback(() => {
    if (!form.state.fieldMeta.amount.isValid) {
      setIsShowErrorDialog.on();
      return;
    }
    if (form.state.fieldMeta.amount.isTouched) fetchFee();
    componentProps.onClose();
  }, [componentProps, fetchFee, form, setIsShowErrorDialog]);

  return (
    <BottomInputDrawer {...componentProps} onClose={handleClose}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}>
        <form.Field
          name="amount"
          children={field => (
            <>
              <VStack className="justify-between flex-1 py-4">
                <VStack className="w-full items-center gap-y-4">
                  <Input size="lg" className="px-2 rounded-xl h-14">
                    <InputSlot>
                      <TokenSymboIcon size={20} color={theme.colors.secondary[700]} />
                    </InputSlot>
                    <InputField
                      keyboardType="numeric"
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="金額を入力してください"
                      value={field.state.value}
                      onChangeText={e => field.handleChange(e)}
                      onBlur={field.handleBlur}
                    />
                  </Input>
                  <ReceiveAmountSummary transferForm={transferForm} display="sendable" />
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
                title="請求額入力不正"
                isOpen={isShowErrorDialog}
                onClose={setIsShowErrorDialog.off}
                size="lg"
              >
                <VStack className="py-4 gap-y-1">
                  {field.state.meta.errors.map((error, index) => (
                    <ErrorText key={`amount-error-${index}`}>{error?.message}</ErrorText>
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

export default ReceiveAmountField;
