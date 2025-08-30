import { Input, InputField, Pressable, Text, useToken, VStack } from "@gluestack-ui/themed";
import { useEffect, useMemo, useState } from "react";

import { Token, TOKEN_TO_SYMBOL_ICON } from "@/registries/TokenRegistry";

import { UseTransferAmountFormResult } from "../../_hooks/useTransferAmountForm";

const CHAR_WIDTH = 24;
const PADDING = 53;

type TransferAmountInputProps = {
  token: Token;
  transferableAmount: number;
  handleAmountSubmit: UseTransferAmountFormResult["handleAmountSubmit"];
};

const TransferAmountInput = (props: TransferAmountInputProps) => {
  const { token, transferableAmount, handleAmountSubmit } = props;
  const [inputAmount, setInputAmount] = useState<string>("");

  const TokenSymboIcon = TOKEN_TO_SYMBOL_ICON[token];
  const symbolIconColor = useToken<"colors">("colors", "secondary900");

  const inputWidth = useMemo<number>(() => (inputAmount.length + 1) * CHAR_WIDTH + PADDING, [inputAmount]);

  const handleChangeText = (text: string) => {
    let sanitized = text.replace(/[^0-9.]/g, "");

    const parts = sanitized.split(".");
    if (parts.length > 2) sanitized = parts[0] + "." + parts.slice(1).join("");
    if (sanitized.startsWith("0") && sanitized.length > 1 && sanitized[1] !== ".") sanitized = "0";

    setInputAmount(sanitized);
  };

  const handleSetTransferableAmount = () => {
    setInputAmount(transferableAmount.toString());
    handleAmountSubmit(transferableAmount.toString());
  };

  useEffect(() => {
    setInputAmount("");
    handleAmountSubmit("0");
  }, [token, handleAmountSubmit]);

  return (
    <VStack w="$full" alignItems="center">
      <Pressable w="$full" onPress={handleSetTransferableAmount}>
        <Text fontSize="$sm" fontWeight="$bold" color="$primary500" textAlign="right">
          最大額を使用
        </Text>
      </Pressable>
      <Input h={52} borderWidth={0} alignItems="center" maxWidth="$full" minWidth={80} w={inputWidth}>
        <TokenSymboIcon size={28} color={symbolIconColor} />
        <InputField
          fontSize={48}
          color="$secondary900"
          keyboardType="numeric"
          textAlign="left"
          placeholder="0"
          value={inputAmount}
          onChangeText={handleChangeText}
          onEndEditing={e => {
            handleAmountSubmit(e.nativeEvent.text);
          }}
        />
      </Input>
    </VStack>
  );
};

export default TransferAmountInput;
