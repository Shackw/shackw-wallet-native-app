import { useState } from "react";

import BackDrop from "@/components/BackDrop";
import { ScreenContainer } from "@/components/Container";
import { AlertDialog } from "@/components/Dialog";
import { Tab } from "@/components/Tab";
import { ErrorText } from "@/components/Text";
import { Token, TOKENS_MAP } from "@/registries/TokenRegistry";
import { Box } from "@/vendor/gluestack-ui/box";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import TransferAmount from "./_components/TransferAmount";
import TransferFeeToken from "./_components/TransferFeeToken";
import TransferRecipient from "./_components/TransferRecipient";
import TransferSubmitButton from "./_components/TransferSubmitButton";
import { TransferFormProvider } from "./_hooks/useTransferForm";
import useTransferSearchParams from "./_hooks/useTransferSearchParams";

const TransferScreen = () => {
  const [selectedToken, setSelectedToken] = useState<Token>("JPYC");
  const { isTrying, isTryedError, submitButtonRef, initAmount, initFeeToken, initRecipient, setIsTryedError } =
    useTransferSearchParams({ setSelectedToken });

  return (
    <ScreenContainer title="送信" className="bg-white rounded-t-2xl">
      <Box className="py-[8px] flex-1">
        <Box className="px-[12px]">
          <Tab options={TOKENS_MAP} value={selectedToken} handleChange={setSelectedToken} />
        </Box>
        <TransferFormProvider
          sendToken={selectedToken}
          initAmount={initAmount}
          initFeeToken={initFeeToken}
          initRecipient={initRecipient}
        >
          <VStack className="flex-1 bg-secondary-100">
            <VStack className="gap-y-8">
              <TransferRecipient />
              <TransferFeeToken />
              <TransferAmount />
            </VStack>
            <TransferSubmitButton ref={submitButtonRef} isTrying={isTrying} />
          </VStack>
        </TransferFormProvider>
      </Box>

      <BackDrop visible={isTrying} />

      <AlertDialog title="読み取りエラー" isOpen={isTryedError} onClose={setIsTryedError.off} size="lg">
        <VStack className="py-4 gap-y-1">
          <ErrorText className="flex-1">読み込まれた情報が正しくない可能性があります。</ErrorText>
        </VStack>
      </AlertDialog>
    </ScreenContainer>
  );
};

export default TransferScreen;
