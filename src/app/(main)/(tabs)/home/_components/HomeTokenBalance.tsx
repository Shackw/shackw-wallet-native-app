import { RefreshCcw } from "lucide-react-native";

import { IconButton } from "@/components/Button";
import { toAllowedStr } from "@/helpers/tokenUnits";
import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { Token, TOKEN_TO_SYMBOL_ICON } from "@/registries/TokenRegistry";
import { theme } from "@/styles/theme";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Spinner } from "@/vendor/gluestack-ui/spinner";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type HomeTokenBalanceProps = { token: Token };

const HomeTokenBalance = ({ token }: HomeTokenBalanceProps) => {
  const tokenBalanceResult = useTokenBalanceContext();
  const { balance, isFetching, refetch } = tokenBalanceResult[token];

  const TokenSymboIcon = TOKEN_TO_SYMBOL_ICON[token];

  return (
    <VStack className="gap-y-4 items-center relative w-full">
      <Text className="text-primary-500 font-bold">現在高</Text>
      {balance && !isFetching ? (
        <>
          <HStack className="flex-row items-center gap-x-2">
            <TokenSymboIcon size={28} color={theme.colors.primary[500]} />
            <Text className="font-heading font-bold text-primary-500 text-[32px] leading-[40px]">
              {toAllowedStr(Number(balance), token)}
            </Text>
          </HStack>
          <IconButton
            icon={RefreshCcw}
            iconSize={28}
            iconColor={theme.colors.secondary[600]}
            className="absolute right-5 top-[-6px]"
            action="none"
            onPress={refetch}
          />
        </>
      ) : (
        <Spinner color={theme.colors.primary[400]} size={34.3} />
      )}
    </VStack>
  );
};

export default HomeTokenBalance;
