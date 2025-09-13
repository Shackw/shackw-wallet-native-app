import { useState } from "react";
import { Address } from "viem";

import { Input, InputField } from "@/vendor/gluestack-ui/input";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

const TransferAmountInputDialog = () => {
  const [inputRecipient, setInputRecipient] = useState<Address>();

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

export default TransferAmountInputDialog;
