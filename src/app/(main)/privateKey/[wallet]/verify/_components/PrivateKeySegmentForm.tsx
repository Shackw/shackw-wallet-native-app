import { memo, useCallback, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { SubContainButton, ContainButton } from "@/presentation/components/Button";
import { FormControl } from "@/presentation/components/gluestack-ui/form-control";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Input, InputField } from "@/presentation/components/gluestack-ui/input";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { InfoText } from "@/presentation/components/Text";

type PrivateKeySegmentFormProps = {
  initValue: string;
  placeholder: string;
  maxLength: number;
  onClose: () => void;
  onReset: () => void;
  onEdit: (value: string) => void;
};

const PrivateKeySegmentForm = (props: PrivateKeySegmentFormProps) => {
  const { initValue, placeholder, maxLength, onClose, onReset, onEdit } = props;

  const [input, setInput] = useState<string>(initValue);

  const handleClose = useCallback(() => {
    if (!input) return onClose();
    {
      onReset();
      setInput("");
      return;
    }
  }, [input, onClose, onReset]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      extraScrollHeight={30}
    >
      <VStack className="flex-1 items-center justify-between py-4">
        <VStack className="w-full gap-y-6">
          <FormControl>
            <Input size="lg" className="px-2 rounded-xl h-14">
              <InputField
                defaultValue={initValue}
                inputMode="text"
                placeholder={placeholder}
                value={input}
                maxLength={maxLength}
                onChangeText={e => setInput(e)}
              />
            </Input>
          </FormControl>
          <InfoText>{`プライベートキーの${placeholder}`}</InfoText>
        </VStack>

        <HStack className="gap-x-4">
          <SubContainButton text={!input ? "閉じる" : "クリア"} size="lg" className="flex-1" onPress={handleClose} />
          <ContainButton
            text="確定"
            size="lg"
            className="flex-1"
            isDisabled={input.length !== maxLength}
            onPress={() => onEdit(input)}
          />
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default memo(PrivateKeySegmentForm);
