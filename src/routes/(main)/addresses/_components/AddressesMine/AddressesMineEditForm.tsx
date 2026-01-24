import { memo } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BackDrop from "@/presentation/components/BackDrop";
import { SubContainButton, ContainButton } from "@/presentation/components/Button";
import { AlertDialog } from "@/presentation/components/Dialog";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText
} from "@/presentation/components/gluestack-ui/form-control";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Input, InputField } from "@/presentation/components/gluestack-ui/input";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

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

  const tw = useTw();

  return (
    <>
      <BackDrop visible={isEditing} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        extraScrollHeight={30}
      >
        <VStack className={cn("flex-1 items-center justify-between", tw.py(4), tw.gapY(5))}>
          <VStack className={cn("w-full", tw.gapY(6))}>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText className={tw.text("md")}>名前</FormControlLabelText>
              </FormControlLabel>
              <Input size={tw.input("lg")} className={cn(tw.px(2), "rounded-xl h-14")}>
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
            <InfoText>{`QRコードでアドレスを共有した際に、登録されている名前が相手のアドレス帳に反映されます。`}</InfoText>
          </VStack>

          <HStack className={cn(tw.gapX(4))}>
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

      <AlertDialog title="入力不正" isOpen={!!error} onClose={closeError} size="lg">
        <VStack className={cn(tw.py(4), tw.gapY(1))}>
          <ErrorText>{error}</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default memo(AddressesMineEditForm);
