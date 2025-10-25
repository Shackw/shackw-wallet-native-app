import { memo } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BackDrop from "@/components/BackDrop";
import { SubContainButton, ContainButton } from "@/components/Button";
import { AlertDialog } from "@/components/Dialog";
import { ErrorText, InfoText } from "@/components/Text";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/vendor/gluestack-ui/form-control";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Input, InputField } from "@/vendor/gluestack-ui/input";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useEditProfileForm from "./_hooks/useEditProfileForm";

type AddressesMineEditFormProps = {
  initName: string;
  onClose: () => void;
  onEdit: (name: string) => Promise<void>;
};

const AddressesMineEditForm = (props: AddressesMineEditFormProps) => {
  const { initName } = props;
  const { inputRef, hasValue, isEditing, error, handleEdit, handleChange, handleBlur, handleClear, closeError } =
    useEditProfileForm(props);

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
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>名前</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg" className="px-2 rounded-xl h-14">
                <InputField
                  defaultValue={initName}
                  inputMode="text"
                  placeholder="名前を入力してください"
                  ref={inputRef as any}
                  onChangeText={handleChange}
                  onBlur={handleBlur}
                />
              </Input>
            </FormControl>
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
