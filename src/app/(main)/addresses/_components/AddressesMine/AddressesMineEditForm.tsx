import { memo, useCallback, useRef, useState } from "react";
import { TextInput as RNTextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BackDrop from "@/components/BackDrop";
import { SubContainButton, ContainButton } from "@/components/Button";
import { AlertDialog } from "@/components/Dialog";
import { ErrorText, InfoText } from "@/components/Text";
import { useBoolean } from "@/hooks/useBoolean";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Textarea, TextareaInput } from "@/vendor/gluestack-ui/textarea";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type AddressesMineEditFormProps = {
  initName: string;
  onClose: () => void;
  onEdit: (name: string) => Promise<void>;
};

const SAFE_NAME_12: RegExp = (() => {
  try {
    return new RegExp("^[^\\p{C}\\u200B-\\u200D\\u2060\\uFEFF<>[\\]{}\\\\]{1,12}$", "u");
  } catch {
    return /^[^\x00-\x1F\x7F-\x9F\u200B-\u200D\u2060\uFEFF<>[\]{}\\]{1,12}$/;
  }
})();

const normalizeNameInput = (s: string) =>
  String(s ?? "")
    .normalize("NFC")
    .replace(/[\r\n\t]/g, "")
    .replace(/[\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]+/g, " ")
    .trim();

const AddressesMineEditForm = (props: AddressesMineEditFormProps) => {
  const { initName, onClose, onEdit } = props;
  const [error, setError] = useState<string>();
  const [hasValue, setHasValue] = useState(false);
  const [isEditing, setIsEditing] = useBoolean(false);

  const nameRef = useRef(initName);
  const inputRef = useRef<RNTextInput | null>(null);

  const handleChange = useCallback((t: string) => {
    nameRef.current = t;
    setHasValue(t.length > 0);
  }, []);

  const handleBlur = useCallback(() => {
    const normalized = normalizeNameInput(nameRef.current);
    nameRef.current = normalized;
    inputRef.current?.setNativeProps({ text: normalized });
    setHasValue(normalized.length > 0);
  }, []);

  const handleClear = useCallback(() => {
    if (!nameRef.current) {
      onClose();
      return;
    }
    nameRef.current = "";
    setHasValue(false);
    inputRef.current?.setNativeProps({ text: "" });
  }, [onClose]);

  const handleEdit = useCallback(async () => {
    setIsEditing.on();
    try {
      const value = normalizeNameInput(nameRef.current);
      if (!SAFE_NAME_12.test(value)) {
        setError("名前は12文字以内、危険記号・制御以外で入力してください。");
        return;
      }
      await onEdit(value);
      onClose();
    } finally {
      setIsEditing.off();
    }
  }, [onClose, onEdit, setIsEditing]);

  const closeError = useCallback(() => setError(undefined), []);

  return (
    <>
      <BackDrop visible={isEditing} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <VStack className="flex-1 items-center justify-between py-4">
          <VStack className="w-full gap-y-6">
            <Textarea size="lg" className="px-2 rounded-xl h-20">
              <TextareaInput
                defaultValue={initName}
                inputMode="text"
                placeholder="名前を入力してください"
                ref={inputRef as any}
                onChangeText={handleChange}
                onBlur={handleBlur}
              />
            </Textarea>
            <InfoText className="flex-1">
              QRコードでアドレスを共有した際に、登録されている名前が相手のアドレス帳に反映されます。
            </InfoText>
          </VStack>

          <HStack className="gap-x-4">
            <SubContainButton
              text={!hasValue ? "閉じる" : "クリア"}
              size="lg"
              className="flex-1"
              onPress={handleClear}
            />
            <ContainButton
              text="編集"
              size="lg"
              className="flex-1"
              isDisabled={!hasValue}
              isLoading={isEditing}
              onPress={handleEdit}
            />
          </HStack>
        </VStack>
      </KeyboardAwareScrollView>

      <AlertDialog title="秘密鍵入力不正" isOpen={!!error} onClose={closeError} size="lg">
        <VStack className="py-4 gap-y-1">
          <ErrorText className="flex-1">{error}</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default memo(AddressesMineEditForm);
