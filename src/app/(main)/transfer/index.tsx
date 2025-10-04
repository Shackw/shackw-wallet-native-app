import { useState } from "react";

import { ScreenContainer } from "@/components/Container";
import { Tab } from "@/components/Tab";
import { Token, TOKENS_MAP } from "@/registries/TokenRegistry";
import { Box } from "@/vendor/gluestack-ui/box";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import TransferAmount from "./_components/TransferAmount";
import TransferFeeToken from "./_components/TransferFeeToken";
import TransferRecipient from "./_components/TransferRecipient";
import TransferSubmitButton from "./_components/TransferSubmitButton";
import { TransferFormProvider } from "./_hooks/useTransferForm";

const TransferScreen = () => {
  const [selectedToken, setSelectedToken] = useState<Token>("JPYC");

  return (
    <ScreenContainer title="送信" className="bg-white rounded-t-2xl">
      <Box className="py-[8px] flex-1">
        <Box className="px-[12px]">
          <Tab options={TOKENS_MAP} value={selectedToken} handleChange={setSelectedToken} />
        </Box>
        <TransferFormProvider sendToken={selectedToken}>
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
