import { Text, Spinner, HStack, useToken } from "@gluestack-ui/themed";

import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { TokenKind, TOKEN_TO_SYMBOL_ICON } from "@/shared/domain/tokens/registry";

type HomeTokenBalanceProps = {
  token: TokenKind;
};

const HomeTokenBalance = (props: HomeTokenBalanceProps) => {
  const { token } = props;
  const { tokenToBalance } = useTokenBalanceContext();
  const symbolIconColor = useToken<"colors">("colors", "primary500");

  const balance = tokenToBalance[token];
  if (!balance) return <Spinner size={34.3} color="$primary400" />;

  const TokenSymboIcon = TOKEN_TO_SYMBOL_ICON[token];

  return (
    <HStack alignItems="center" columnGap="$2">
      <TokenSymboIcon size={28} color={symbolIconColor} />
      <Text fontSize="$5xl" color="$primary500" fontWeight="$bold" lineHeight="$3xl">
        {balance}
      </Text>
    </HStack>
  );
};

export default HomeTokenBalance;
