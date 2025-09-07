import { Text, Spinner, HStack, useToken } from "@gluestack-ui/themed";

import { formatUpToN } from "@/helpers/number";
import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { Token, TOKEN_TO_SYMBOL_ICON } from "@/registries/TokenRegistry";

type HomeTokenBalanceProps = {
  token: Token;
};

const HomeTokenBalance = (props: HomeTokenBalanceProps) => {
  const { token } = props;
  const tokenBalanceResult = useTokenBalanceContext();
  const symbolIconColor = useToken<"colors">("colors", "primary500");

  const balance = tokenBalanceResult[token].balance;
  if (!balance) return <Spinner size={34.3} color="$primary400" />;

  const TokenSymboIcon = TOKEN_TO_SYMBOL_ICON[token];

  return (
    <HStack alignItems="center" columnGap="$2">
      <TokenSymboIcon size={28} color={symbolIconColor} />
      <Text fontSize="$5xl" color="$primary500" fontWeight="$bold" lineHeight="$3xl">
        {formatUpToN(Number(balance), 3)}
      </Text>
    </HStack>
  );
};

export default HomeTokenBalance;
