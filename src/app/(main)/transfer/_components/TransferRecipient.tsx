import { Input, InputField, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";

import { useTransferRecipientFormResult } from "../_hooks/useTransferRecipientForm";

type TransferRecipientProps = { form: useTransferRecipientFormResult };

const TransferRecipient = (props: TransferRecipientProps) => {
  const [inputRecipient, setInputRecipient] = useState<string>();
  const { recipientError, handleRecipientSubmit } = props.form;

  return (
    <VStack alignItems="center" minHeight={110} rowGap="$3">
      <Text w="$full" fontWeight="$bold">
        宛先
      </Text>
      <Input variant="outline" size="lg">
        <InputField
          fontSize="$sm"
          keyboardType="numbers-and-punctuation"
          placeholder="パブリックアドレス(0x)"
          value={inputRecipient}
          onChangeText={text => {
            setInputRecipient(text);
          }}
          onEndEditing={e => {
            handleRecipientSubmit(e.nativeEvent.text);
          }}
        />
      </Input>
      {recipientError && (
        <Text color="$primary600" fontSize="$lg" fontWeight="$bold">
          {recipientError}
        </Text>
      )}
    </VStack>
  );
};

export default TransferRecipient;
