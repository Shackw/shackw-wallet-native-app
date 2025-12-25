import { Redirect } from "expo-router";
import { useEffect, useMemo } from "react";

import { Box } from "@/presentation/components/gluestack-ui/box";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useLoadingOverlay } from "@/presentation/providers/LoadingOverlayProvider";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useTokenBalanceContext } from "@/presentation/providers/TokenBalanceProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import ScreenContainer from "../_components/ScreenContainer";

import TransferAmount from "./_components/TransferAmount";
import TransferFeeToken from "./_components/TransferFeeToken";
import TransferRecipient from "./_components/TransferRecipient";
import TransferSearchParam from "./_components/TransferSearchParam";
import TransferSendToken from "./_components/TransferSendToken";
import TransferSubmitButton from "./_components/TransferSubmitButton";
import { TransferFormProvider } from "./_hooks/useTransferForm";

const TransferScreen = () => {
  const tw = useTw();
  const { show, hide } = useLoadingOverlay();
  const tokenBalances = useTokenBalanceContext();
  const { walletEnabled } = useShackwWalletContext();
  const { currentChainSupportedTokens } = useWalletPreferencesContext();

  const isBalanceFetched = useMemo(
    () =>
      Object.entries(tokenBalances).every(
        ([key, value]) => !Object.keys(currentChainSupportedTokens).includes(key) || value.isFetched
      ),
    [tokenBalances, currentChainSupportedTokens]
  );

  useEffect(() => {
    if (!isBalanceFetched) show();
    else hide();
  }, [isBalanceFetched, show, hide]);

  if (!isBalanceFetched) return null;

  if (!walletEnabled) return <Redirect href="/(main)/(tabs)" />;

  return (
    <ScreenContainer appBarProps={{ title: "送信" }} className={cn("bg-white", "rounded-t-2xl")}>
      <Box className={cn(tw.py(2), "flex-1")}>
        <TransferFormProvider>
          <TransferSearchParam />

          <TransferSendToken />
          <VStack className={cn("flex-1", "bg-secondary-100")}>
            <VStack className={cn(tw.gapY(8))}>
              <TransferRecipient />
              <TransferFeeToken />
              <TransferAmount />
            </VStack>
            <TransferSubmitButton />
          </VStack>
        </TransferFormProvider>
      </Box>
    </ScreenContainer>
  );
};

export default TransferScreen;
