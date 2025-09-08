import React from "react";
import { ActivityIndicator } from "react-native";

import { HStack } from "@/gluestack/hstack";
import { Text } from "@/gluestack/text";
import { formatUpToN } from "@/helpers/number";
import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { Token, TOKEN_TO_SYMBOL_ICON } from "@/registries/TokenRegistry";
import { theme } from "@/styles/theme";

type HomeTokenBalanceProps = { token: Token };

const HomeTokenBalance = ({ token }: HomeTokenBalanceProps) => {
  const tokenBalanceResult = useTokenBalanceContext();

  const balance = tokenBalanceResult[token].balance;
  if (!balance) {
    return <ActivityIndicator color={theme.colors.primary[400]} style={{ transform: [{ scale: 34.3 / 18 }] }} />;
  }

  const TokenSymboIcon = TOKEN_TO_SYMBOL_ICON[token];

  return (
    <HStack className="flex-row items-center gap-x-2">
      <TokenSymboIcon size={28} color={theme.colors.primary[500]} />
      <Text className="font-heading font-bold text-primary-500 text-[32px] leading-[40px]">
        {formatUpToN(Number(balance), 3)}
      </Text>
    </HStack>
  );
};

export default HomeTokenBalance;
