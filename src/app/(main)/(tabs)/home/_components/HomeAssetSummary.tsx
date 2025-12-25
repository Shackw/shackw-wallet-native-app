import { RefreshCcw } from "lucide-react-native";
import { useCallback } from "react";

import { AppText } from "@/presentation/components/AppText";
import { IconButton } from "@/presentation/components/Button";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useLastTransactionContext } from "@/presentation/providers/LastTransactionProvider";
import { useTokenBalanceContext } from "@/presentation/providers/TokenBalanceProvider";
import { theme } from "@/presentation/styles/theme";
import { useTw } from "@/presentation/styles/tw";
import { Token, TOKEN_REGISTRY } from "@/registries/ChainTokenRegistry";
import { cn } from "@/shared/helpers/cn";
import { toAllowedStr } from "@/shared/helpers/tokenUnits";

import useLastTransactionElement from "../_hooks/useLastTransactionElement";

type HomeAssetSummaryProps = { token: Token };

const HomeAssetSummary = (props: HomeAssetSummaryProps) => {
  const { token } = props;

  const tw = useTw();

  const tokenBalances = useTokenBalanceContext();
  const lastTranResult = useLastTransactionContext();
  const { balance, isFetching, refetch: refetchBalance } = tokenBalances[token];
  const { element, pl, optinalElement } = useLastTransactionElement({ ...lastTranResult });

  const TokenSymboIcon = TOKEN_REGISTRY[token].Icon;

  const handleRefetch = useCallback(() => {
    refetchBalance();
    lastTranResult.refetch();
  }, [lastTranResult, refetchBalance]);

  return (
    <>
      <VStack className={cn("items-center relative w-full", "justify-between", tw.gapY(4), tw.h(26))}>
        <AppText t="md" className="text-primary-500 font-bold">
          現在高
        </AppText>

        {balance && !isFetching ? (
          <>
            <HStack className={cn("flex-row items-center", tw.gapX(2))}>
              <TokenSymboIcon size={28} color={theme.colors.primary[500]} />
              <AppText className="font-heading font-bold text-primary-500 text-[32px] leading-[40px]">
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

      <HStack className={cn("flex-row items-center", tw.gapX(0.5))}>
        <AppText t="md" className="leading-5 text-secondary-800">
          最終取引日時：
        </AppText>
        <AppText t="md" className="leading-5 text-secondary-800 w-[103px]" style={{ paddingLeft: pl }}>
          {element}
          {optinalElement}
        </AppText>
      </HStack>
    </>
  );
};

export default HomeAssetSummary;
