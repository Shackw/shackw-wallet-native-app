import { RefreshCcw } from "lucide-react-native";

import { IconButton } from "@/presentation/components/Button";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTokenBalanceContext } from "@/presentation/providers/TokenBalanceProvider";
import { theme } from "@/presentation/styles/theme";
import { Token, TOKEN_REGISTRY } from "@/registries/TokenRegistry";
import { toAllowedStr } from "@/shared/helpers/tokenUnits";

type HomeTokenBalanceProps = { token: Token };

const HomeTokenBalance = ({ token }: HomeTokenBalanceProps) => {
  const tokenBalances = useTokenBalanceContext();
  const { balance, isFetching, refetch } = tokenBalances[token];

  const TokenSymboIcon = TOKEN_REGISTRY[token].Icon;

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
            iconSize={20}
            iconColor={theme.colors.secondary[600]}
            className="absolute right-5 top-[-6px]"
            action="default"
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
