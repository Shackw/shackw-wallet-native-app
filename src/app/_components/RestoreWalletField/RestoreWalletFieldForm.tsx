import { memo } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BackDrop from "@/presentation/components/BackDrop";
import { SubContainButton, ContainButton } from "@/presentation/components/Button";
import { AlertDialog } from "@/presentation/components/Dialog";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Textarea, TextareaInput } from "@/presentation/components/gluestack-ui/textarea";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import useRestoreWalletByPkForm from "@apph/useRestoreWalletByPkForm";

type RestoreWalletFieldFormProps = {
  onClose: () => void;
  onRestore: (pk: string) => Promise<void>;
};

const RestoreWalletFieldForm = (props: RestoreWalletFieldFormProps) => {
  const { inputRef, hasValue, isRestoring, error, handleRestore, handleChange, handleBlur, handleClear, closeError } =
    useRestoreWalletByPkForm(props);

  const tw = useTw();

  return (
    <>
      <BackDrop visible={isRestoring} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        extraScrollHeight={30}
      >
        <VStack className={cn("flex-1 items-center justify-between", tw.py(4), tw.gapY(5))}>
          <VStack className={cn("w-full", tw.gapY(6))}>
            <Textarea size={tw.input("lg")} className={cn(tw.p(2), "rounded-xl", tw.h(24))}>
              <TextareaInput
                defaultValue=""
                inputMode="text"
                placeholder="秘密鍵を入力してください"
                ref={inputRef as any}
                onChangeText={handleChange}
                onBlur={handleBlur}
              />
            </Textarea>
            <InfoText>{`SHACKW WALLET以外で作成された秘密鍵を使用して復元することが可能です。`}</InfoText>
          </VStack>

          <HStack className={cn(tw.gapX(4))}>
            <SubContainButton
              text={!hasValue ? "閉じる" : "クリア"}
              size="lg"
              className="flex-1"
              onPress={handleClear}
            />
            <ContainButton
              text="復元"
              size="lg"
              className="flex-1"
              isDisabled={!hasValue}
              isLoading={isRestoring}
              onPress={handleRestore}
            />
          </HStack>
        </VStack>
      </KeyboardAwareScrollView>

      <AlertDialog title="秘密鍵入力不正" isOpen={!!error} onClose={closeError} size="lg">
        <VStack className={cn(tw.py(4), tw.gapY(1))}>
          <ErrorText>{error}</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default memo(RestoreWalletFieldForm);
