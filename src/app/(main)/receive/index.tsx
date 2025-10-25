import BackDrop from "@/components/BackDrop";
import { ScreenContainer } from "@/components/Container";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { Box } from "@/vendor/gluestack-ui/box";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import ReceiveAmount from "./_components/ReceiveAmount";
import ReceiveFeeToken from "./_components/ReceiveFeeToken";
import ReceiveSendToken from "./_components/ReceiveSendToken";
import ReceiveSubmitButton from "./_components/ReceiveSubmitButton";
import ReceiveWebhookUrl from "./_components/ReceiveWebhookUrl";
import { ReceiveFormProvider } from "./_hooks/useReceiveForm";

const ReceiveScreen = () => {
  const { account } = useHinomaruWalletContext();

  if (!account) return <BackDrop visible />;

  return (
    <ScreenContainer appBarProps={{ title: "受け取り" }} className="bg-white rounded-t-2xl">
      <Box className="py-[8px] flex-1">
        <ReceiveFormProvider>
          <ReceiveSendToken />
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
