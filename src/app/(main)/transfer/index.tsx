import { useMemo } from "react";

import { ScreenContainer } from "@/presentation/components/Container";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import Loading from "@/presentation/components/Loading";
import { useTokenBalanceContext } from "@/presentation/providers/TokenBalanceProvider";

import TransferAmount from "./_components/TransferAmount";
import TransferFeeToken from "./_components/TransferFeeToken";
import TransferRecipient from "./_components/TransferRecipient";
import TransferSearchParam from "./_components/TransferSearchParam";
import TransferSendToken from "./_components/TransferSendToken";
import TransferSubmitButton from "./_components/TransferSubmitButton";
import { TransferFormProvider } from "./_hooks/useTransferForm";

const TransferScreen = () => {
  const tokenBalances = useTokenBalanceContext();
  const isBalanceFetched = useMemo(() => Object.values(tokenBalances).every(v => v.isFetched), [tokenBalances]);

  if (!isBalanceFetched) return <Loading />;

  return (
    <ScreenContainer appBarProps={{ title: "送信" }} className="bg-white rounded-t-2xl">
      <Box className="py-[8px] flex-1">
        <TransferFormProvider>
          <TransferSearchParam />

          <TransferSendToken />
          <VStack className="flex-1 bg-secondary-100">
            <VStack className="gap-y-8">
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
