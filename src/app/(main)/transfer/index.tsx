import { VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Address } from "viem";

import { ContainButton } from "@/components/Button";
import { ScreenContainer } from "@/components/Container";
import { Tab } from "@/components/Tab";
import { useTransferToken } from "@/hooks/mutations/useTransferToken";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { Token, TOKENS } from "@/registries/TokenRegistry";

import TransferAmount from "./_components/TransferAmount";
import TransferRecipient from "./_components/TransferRecipient";
import useTransferAmountForm from "./_hooks/useTransferAmountForm";
import useTransferRecipientForm from "./_hooks/useTransferRecipientForm";

const TransferScreen = () => {
  const { account, client } = useHinomaruWalletContext();
  const [selectedToken, setSelectedToken] = useState<Token>("JPYC");
  const { mutateAsync: transferToken } = useTransferToken();

  const recipientForm = useTransferRecipientForm();
  const amountForm = useTransferAmountForm({ token: selectedToken });

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
    <ScreenContainer title="送信" bgColor="$white" borderTopLeftRadius={12} borderTopRightRadius={12}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 12, paddingVertical: 8 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <VStack rowGap="$5" alignItems="center" flex={1}>
          <Tab options={TOKENS} value={selectedToken} handleChange={setSelectedToken} />
          <VStack px="$5" rowGap="$1.5">
            <TransferAmount token={selectedToken} form={amountForm} />
            <TransferRecipient form={recipientForm} />
          </VStack>
        </VStack>
        <ContainButton text="確認画面へ" size="lg" w="$full" isDisabled={!isValid} mb={5} onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default TransferScreen;
