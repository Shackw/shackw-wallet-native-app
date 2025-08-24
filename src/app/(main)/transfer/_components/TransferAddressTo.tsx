import { Input, InputField, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";

import { useTransferAddressToFormResult } from "../_hooks/useTransferAddressToForm";

type TransferAddressToProps = { form: useTransferAddressToFormResult };

const TransferAddressTo = (props: TransferAddressToProps) => {
  const [inputAddressTo, setInputAddressTo] = useState<string>();
  const { addressToError, handleAddressToSubmit } = props.form;

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
          value={inputAddressTo}
          onChangeText={text => {
            setInputAddressTo(text);
          }}
          onEndEditing={e => {
            handleAddressToSubmit(e.nativeEvent.text);
          }}
        />
      </Input>
      {addressToError && (
        <Text color="$primary600" fontSize="$lg" fontWeight="$bold">
          {addressToError}
        </Text>
      )}
    </VStack>
  );
};

export default TransferAddressTo;
