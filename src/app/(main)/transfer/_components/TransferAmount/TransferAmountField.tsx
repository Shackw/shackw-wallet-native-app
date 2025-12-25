import { useCallback } from "react";
import { Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AppText } from "@/presentation/components/AppText";
import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { SubContainButton, ContainButton } from "@/presentation/components/Button";
import { AlertDialog } from "@/presentation/components/Dialog";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Input, InputField, InputSlot } from "@/presentation/components/gluestack-ui/input";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText } from "@/presentation/components/Text";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { theme } from "@/presentation/styles/theme";
import { useTw } from "@/presentation/styles/tw";
import { TOKEN_REGISTRY } from "@/registries/ChainTokenRegistry";
import { cn } from "@/shared/helpers/cn";

import { TransferFormContextType } from "../../_hooks/useTransferForm";

import TransferAmountSummary from "./TransferAmountSummary";

type TransferAmountFieldProps = {
  prevValue: number | undefined;
  transferForm: TransferFormContextType;
  componentProps: Omit<React.ComponentProps<typeof BottomActionSheet>, "children">;
};

const TransferAmountField = (props: TransferAmountFieldProps) => {
  const tw = useTw();
  const { prevValue, transferForm, componentProps } = props;

  const { form, maxSendable, sendToken } = transferForm;
  const [isShowErrorDialog, setIsShowErrorDialog] = useBoolean(false);

  const TokenSymboIcon = TOKEN_REGISTRY[sendToken].Icon;

  const handleSetMaxSendable = useCallback(() => {
    form.setFieldValue("amount", maxSendable.toString());
  }, [form, maxSendable]);

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
    if (!form.state.fieldMeta?.amount?.isValid) {
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
          name="amount"
          children={field => (
            <>
              <VStack className={cn("justify-between", "flex-1", tw.py(4))}>
                <VStack className={cn("w-full", "items-center", tw.gapY(4))}>
                  <Pressable onPress={handleSetMaxSendable} className="w-full">
                    <AppText className={cn("text-right", tw.text("md"), "font-bold", "text-primary-500")}>
                      最大額を使用
                    </AppText>
                  </Pressable>
                  <Input size={tw.input("lg")} className={cn(tw.px(2), "rounded-xl", tw.h(14))}>
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
                  <TransferAmountSummary transferForm={transferForm} display="sendable" />
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
                title="送金額入力不正"
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

export default TransferAmountField;
