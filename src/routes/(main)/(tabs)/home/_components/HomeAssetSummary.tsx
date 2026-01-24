import { RefreshCcw } from "lucide-react-native";
import { useCallback } from "react";

import { AppText } from "@/presentation/components/AppText";
import { IconButton } from "@/presentation/components/Button";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useLastTransactionContext } from "@/presentation/providers/LastTransactionProvider";
import { useTokenBalanceContext } from "@/presentation/providers/TokenBalanceProvider";
import { theme } from "@/presentation/styles/theme";
import { useTw } from "@/presentation/styles/tw";
import type { Token } from "@/registries/ChainTokenRegistry";
import { TOKEN_REGISTRY } from "@/registries/ChainTokenRegistry";
import { cn } from "@/shared/helpers/cn";
import { toAllowedStr } from "@/shared/helpers/tokenUnits";

import HomeLastTransaction from "./HomeLastTransaction";

type HomeAssetSummaryProps = { token: Token };

const HomeAssetSummary = (props: HomeAssetSummaryProps) => {
  const { token } = props;

  const tw = useTw();

  const tokenBalances = useTokenBalanceContext();
  const lastTranResult = useLastTransactionContext();
  const { balance, isFetching, refetch: refetchBalance } = tokenBalances[token];

  const TokenSymboIcon = TOKEN_REGISTRY[token].Icon;

  const handleRefetch = useCallback(() => {
    refetchBalance();
    lastTranResult.refetch();
  }, [lastTranResult, refetchBalance]);

  return (
    <>
      <VStack className={cn("items-center relative w-full", tw.gapY(4), tw.h(26))}>
        <AppText t="lg" className="text-primary-500 font-bold">
          現在高
        </AppText>

        {balance && !isFetching ? (
          <>
            <HStack className={cn("relative flex-row items-center", tw.gapX(2))}>
              <Box className={cn("absolute")} style={{ left: -tw.scaleNum(32) }}>
                <TokenSymboIcon size={tw.scaleNum(24)} color={theme.colors.primary[500]} />
              </Box>
              <AppText
                style={{ fontSize: tw.scaleNum(32), lineHeight: tw.scaleNum(34) }}
                className="font-heading font-bold text-primary-500 align-middle"
              >
                {toAllowedStr(Number(balance), token)}
              </AppText>
            </HStack>

            <IconButton
              icon={RefreshCcw}
              iconSize={tw.scaleNum(25)}
              iconColor={theme.colors.secondary[600]}
              className="absolute right-5 top-[-6px]"
              action="default"
              onPress={handleRefetch}
            />
          </>
        ) : (
          <Spinner color={theme.colors.primary[400]} size={30} />
        )}
      </VStack>

      <HStack className={cn("flex-row items-center justify-between", tw.gapX(0.5))}>
        <AppText className="text-secondary-800">最終取引日時：</AppText>
        <HomeLastTransaction lastTranResult={lastTranResult} />
      </HStack>
    </>
  );
};

export default HomeAssetSummary;
