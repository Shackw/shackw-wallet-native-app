import { useState } from "react";

import BackDrop from "@/components/BackDrop";
import { ScreenContainer } from "@/components/Container";
import { Tab } from "@/components/Tab";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { Token, TOKENS_MAP } from "@/registries/TokenRegistry";
import { Box } from "@/vendor/gluestack-ui/box";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import ReceiveAmount from "./_components/ReceiveAmount";
import ReceiveFeeToken from "./_components/ReceiveFeeToken";
import ReceiveSubmitButton from "./_components/ReceiveSubmitButton";
import ReceiveWebhookUrl from "./_components/ReceiveWebhookUrl";
import { ReceiveFormProvider } from "./_hooks/useReceiveForm";

const ReceiveScreen = () => {
  const { account } = useHinomaruWalletContext();
  const [selectedToken, setSelectedToken] = useState<Token>("JPYC");

  if (!account) return <BackDrop visible />;

  return (
    <ScreenContainer title="受け取り" className="bg-white rounded-t-2xl">
      <Box className="py-[8px] flex-1">
        <Box className="px-[12px]">
          <Tab options={TOKENS_MAP} value={selectedToken} handleChange={setSelectedToken} />
        </Box>
        <ReceiveFormProvider sendToken={selectedToken}>
          <VStack className="flex-1 bg-secondary-100">
            <VStack className="gap-y-8">
              <ReceiveFeeToken />
              <ReceiveAmount />
              <ReceiveWebhookUrl />
            </VStack>
            <ReceiveSubmitButton recipient={account.address} />
          </VStack>
        </ReceiveFormProvider>
      </Box>
    </ScreenContainer>
  );
};

export default ReceiveScreen;
