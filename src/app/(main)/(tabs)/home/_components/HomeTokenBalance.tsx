import React from "react";

import { formatUpToN } from "@/helpers/number";
import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { Token, TOKEN_TO_SYMBOL_ICON } from "@/registries/TokenRegistry";
import { theme } from "@/styles/theme";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Spinner } from "@/vendor/gluestack-ui/spinner";
import { Text } from "@/vendor/gluestack-ui/text";

type HomeTokenBalanceProps = { token: Token };

const HomeTokenBalance = ({ token }: HomeTokenBalanceProps) => {
  const tokenBalanceResult = useTokenBalanceContext();

  const balance = tokenBalanceResult[token].balance;
  if (!balance) return <Spinner color={theme.colors.primary[400]} size={34.3} />;

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
