import React, { useState } from "react";

import { Input, InputField } from "@/gluestack/input";
import { Text } from "@/gluestack/text";
import { VStack } from "@/gluestack/vstack";

import { useTransferRecipientFormResult } from "../_hooks/useTransferRecipientForm";

type TransferRecipientProps = { form: useTransferRecipientFormResult };

const TransferRecipient = ({ form }: TransferRecipientProps) => {
  const [inputRecipient, setInputRecipient] = useState<string>("");
  const { recipientError, handleRecipientSubmit } = form;

  return (
    <VStack className="items-center min-h-[110px] gap-y-3">
      <Text className="w-full font-bold">宛先</Text>
      <Input className="h-13 rounded-lg border border-outline px-3">
        <InputField
          className="text-sm"
          keyboardType="numbers-and-punctuation"
          placeholder="パブリックアドレス(0x)"
          value={inputRecipient}
          onChangeText={text => setInputRecipient(text)}
          onEndEditing={e => handleRecipientSubmit(e.nativeEvent.text)}
        />
      </Input>
      {recipientError && <Text className="w-full text-primary-600 text-sm font-bold">{recipientError}</Text>}
    </VStack>
  );
};

export default TransferRecipient;
