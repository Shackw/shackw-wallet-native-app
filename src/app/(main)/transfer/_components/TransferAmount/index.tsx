import { VStack, Text } from "@gluestack-ui/themed";

import { TokenKind } from "@/configs/token";

import { UseTransferAmountFormResult } from "../../_hooks/useTransferAmountForm";

import TransferAmountInput from "./TransferAmountInput";
import TransferAmountSummary from "./TransferAmountSummary";

type TransferAmountProps = { token: TokenKind; form: UseTransferAmountFormResult };

const TransferAmount = (props: TransferAmountProps) => {
  const { token } = props;
  const { transferableAmount, amountError, handleAmountSubmit } = props.form;

  return (
    <VStack alignItems="center" minHeight={185} py="$3" rowGap={2}>
      <Text w="$full" fontWeight="$bold">
        金額
      </Text>
      <TransferAmountInput
        token={token}
        transferableAmount={transferableAmount}
        handleAmountSubmit={handleAmountSubmit}
      />
      <TransferAmountSummary token={token} transferableAmount={transferableAmount} />
      {amountError && (
        <Text color="$primary600" fontSize="$lg" fontWeight="$bold" mt="$2">
          {amountError}
        </Text>
      )}
    </VStack>
  );
};

export default TransferAmount;
