import { memo, useCallback, useRef, useState } from "react";
import { TextInput as RNTextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BackDrop from "@/components/BackDrop";
import { SubContainButton, ContainButton } from "@/components/Button";
import { AlertDialog } from "@/components/Dialog";
import { ErrorText } from "@/components/Text";
import { useBoolean } from "@/hooks/useBoolean";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Textarea, TextareaInput } from "@/vendor/gluestack-ui/textarea";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type OnBordingInputPkFormProps = {
  onClose: () => void;
  onRestore: (pk: string) => Promise<void>;
};

const OnBordingInputPkForm = (props: OnBordingInputPkFormProps) => {
  const [error, setError] = useState<string>();
  const [hasValue, setHasValue] = useState(false);
  const [isRestoring, setIsRestoring] = useBoolean(false);

  const pkRef = useRef("");
  const inputRef = useRef<RNTextInput | null>(null);

  const handleChange = useCallback((t: string) => {
    pkRef.current = t;
    setHasValue(t.length > 0);
  }, []);

  const handleBlur = useCallback(() => {
    const trimmed = pkRef.current.replace(/\s/g, "");
    pkRef.current = trimmed;
    inputRef.current?.setNativeProps({ text: trimmed });
  }, []);

  const handleClear = useCallback(() => {
    if (!pkRef.current) {
      props.onClose();
      return;
    }
    pkRef.current = "";
    setHasValue(false);
    inputRef.current?.setNativeProps({ text: "" });
  }, [props]);

  const handleRestore = useCallback(async () => {
    try {
      setIsRestoring.on();
      await props.onRestore(pkRef.current);
    } catch (e) {
      setIsRestoring.off();
      setError(e instanceof Error ? e.message : "ウォレットの復元中に不明なエラーが発生しました。");
    }
  }, [props, setIsRestoring]);

  const closeError = useCallback(() => setError(undefined), []);

  return (
    <>
      <BackDrop visible={isRestoring} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <VStack className="flex-1 items-center justify-between py-4">
          <VStack className="w-full">
            <Textarea size="lg" className="px-2">
              <TextareaInput
                defaultValue=""
                inputMode="text"
                placeholder="プライベートキーを入力してください"
                ref={inputRef as any}
                onChangeText={handleChange}
                onBlur={handleBlur}
              />
            </Textarea>
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

      <AlertDialog title="プライベートキー入力不正" isOpen={!!error} onClose={closeError} size="lg">
        <VStack className="py-4 gap-y-1">
          <ErrorText className="flex-1">{error}</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default memo(OnBordingInputPkForm);
