import React, { useEffect, useMemo, useState } from "react";
import { Pressable } from "react-native";

import { Token, TOKEN_TO_SYMBOL_ICON } from "@/registries/TokenRegistry";
import { theme } from "@/styles/theme";
import { Input, InputField } from "@/vendor/gluestack-ui/input";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import { UseTransferAmountFormResult } from "../../_hooks/useTransferAmountForm";

const CHAR_WIDTH = 24;
const PADDING = 53;

type TransferAmountInputProps = {
  token: Token;
  transferableAmount: number;
  handleAmountSubmit: UseTransferAmountFormResult["handleAmountSubmit"];
};

const TransferAmountInput = ({ token, transferableAmount, handleAmountSubmit }: TransferAmountInputProps) => {
  const [inputAmount, setInputAmount] = useState<string>("");

  const TokenSymboIcon = TOKEN_TO_SYMBOL_ICON[token];

  const inputWidth = useMemo<number>(() => (inputAmount.length + 1) * CHAR_WIDTH + PADDING, [inputAmount]);

  const handleChangeText = (text: string) => {
    let sanitized = text.replace(/[^0-9.]/g, "");

    const parts = sanitized.split(".");
    if (parts.length > 2) sanitized = parts[0] + "." + parts.slice(1).join("");
    if (sanitized.startsWith("0") && sanitized.length > 1 && sanitized[1] !== ".") sanitized = "0";

    setInputAmount(sanitized);
  };

  const handleSetTransferableAmount = () => {
    const v = transferableAmount.toString();
    setInputAmount(v);
    handleAmountSubmit(v);
  };

  useEffect(() => {
    setInputAmount("");
    handleAmountSubmit("0");
  }, [token, handleAmountSubmit]);

  return (
    <VStack className="w-full items-center">
      <Pressable onPress={handleSetTransferableAmount} className="w-full">
        <Text className="text-right text-sm font-bold text-primary-500">最大額を使用</Text>
      </Pressable>
      <Input
        className="h-[52px] border-0 items-center max-w-full min-w-[80px] flex-row gap-2"
        style={{ width: inputWidth }}
      >
        <TokenSymboIcon size={28} color={theme.colors.secondary[900]} />
        <InputField
          className="text-[48px] leading-[52px] text-secondary-900"
          keyboardType="numeric"
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
