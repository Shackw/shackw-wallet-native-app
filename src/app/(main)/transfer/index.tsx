import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Address } from "viem";

import { ContainButton } from "@/components/Button";
import { ScreenContainer } from "@/components/Container";
import { Tab } from "@/components/Tab";
import { useTransferToken } from "@/hooks/mutations/useTransferToken";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { Token, TOKENS } from "@/registries/TokenRegistry";
import { Box } from "@/vendor/gluestack-ui/box";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import TransferAmount from "./_components/TransferAmount";
import TransferRecipient from "./_components/TransferRecipient";
import useTransferAmountForm from "./_hooks/useTransferAmountForm";
import useTransferRecipientForm from "./_hooks/useTransferRecipientForm";

const TransferScreen = () => {
  const { account, client } = useHinomaruWalletContext();
  const [selectedToken, setSelectedToken] = useState<Token>("JPYC");

  const recipientForm = useTransferRecipientForm();
  const amountForm = useTransferAmountForm({ token: selectedToken });

  const { mutateAsync: transferToken } = useTransferToken();

  const { recipient, isRecipientValid } = recipientForm;
  const { amount, isAmountValid } = amountForm;

  const isValid = isAmountValid && isRecipientValid && recipient && account && client;

  const handleSubmit = async () => {
    if (!isValid) return;

    const hash = await transferToken({
      account,
      token: selectedToken,
      recipient: recipient as Address,
      amountDecimals: amount,
      client
    });
    console.log(hash);
  };

  return (
    <ScreenContainer title="送信" className="bg-white rounded-t-[12px]">
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true} extraScrollHeight={20}>
        <Box className="py-[8px] flex-1">
          <Box className="px-[12px]">
            <Tab options={TOKENS} value={selectedToken} handleChange={setSelectedToken} />
          </Box>
          <VStack className="flex-1 justify-between bg-secondary-100">
            <VStack className="gap-y-1.5">
              <TransferRecipient form={recipientForm} />
              <TransferAmount token={selectedToken} form={amountForm} />
            </VStack>
            <ContainButton
              text="確認画面へ"
              size="lg"
              isDisabled={!isValid}
              onPress={handleSubmit}
              className="w-full mb-[5px]"
            />
          </VStack>
        </Box>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default TransferScreen;
