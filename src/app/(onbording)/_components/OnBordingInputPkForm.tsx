import { memo } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BackDrop from "@/presentation/components/BackDrop";
import { SubContainButton, ContainButton } from "@/presentation/components/Button";
import { AlertDialog } from "@/presentation/components/Dialog";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Textarea, TextareaInput } from "@/presentation/components/gluestack-ui/textarea";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";

import useRestoreWalletByPkForm from "../_hooks/useRestoreWalletByPkForm";

type OnBordingInputPkFormProps = {
  onClose: () => void;
  onRestore: (pk: string) => Promise<void>;
};

const OnBordingInputPkForm = (props: OnBordingInputPkFormProps) => {
  const { inputRef, hasValue, isRestoring, error, handleRestore, handleChange, handleBlur, handleClear, closeError } =
    useRestoreWalletByPkForm(props);
  return (
    <>
      <BackDrop visible={isRestoring} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <VStack className="flex-1 items-center justify-between py-4">
          <VStack className="w-full gap-y-6">
            <Textarea size="lg" className="p-2 rounded-xl h-20">
              <TextareaInput
                defaultValue=""
                inputMode="text"
                placeholder="秘密鍵を入力してください"
                ref={inputRef as any}
                onChangeText={handleChange}
                onBlur={handleBlur}
              />
            </Textarea>
            <InfoText>HINOMARU WALLET以外で作成された秘密鍵を使用して復元することが可能です。</InfoText>
          </VStack>

          <HStack className="gap-x-4">
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
        <VStack className="py-4 gap-y-1">
          <ErrorText>{error}</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default memo(OnBordingInputPkForm);
