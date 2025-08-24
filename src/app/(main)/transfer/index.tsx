import { VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Address } from "viem";

import { ContainButton } from "@/components/Button";
import { ScreenContainer } from "@/components/Container";
import { Tab } from "@/components/Tab";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { transferToken } from "@/shared/api/transferToken";
import { TokenKind, TOKENS } from "@/shared/domain/tokens/registry";

import TransferAddressTo from "./_components/TransferAddressTo";
import TransferAmount from "./_components/TransferAmount";
import useTransferAddressToForm from "./_hooks/useTransferAddressToForm";
import useTransferAmountForm from "./_hooks/useTransferAmountForm";

const TransferScreen = () => {
  const { eoaAccount: account, walletClient } = useHinomaruWalletContext();
  const [selectedToken, setSelectedToken] = useState<TokenKind>("JPYC");

  const addressToForm = useTransferAddressToForm();
  const amountForm = useTransferAmountForm({ token: selectedToken });

  const { addressTo, isAddressToValid } = addressToForm;
  const { amount, isAmountValid } = amountForm;

  const isValid = isAmountValid && isAddressToValid && addressTo && account && walletClient;

  const handleSubmit = async () => {
    if (!isValid) return;

    const hash = await transferToken({
      account,
      token: selectedToken,
      to: addressTo as Address,
      amount,
      walletClient
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
            <TransferAddressTo form={addressToForm} />
          </VStack>
        </VStack>
        <ContainButton text="確認画面へ" size="lg" w="$full" isDisabled={!isValid} mb={5} onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default TransferScreen;
