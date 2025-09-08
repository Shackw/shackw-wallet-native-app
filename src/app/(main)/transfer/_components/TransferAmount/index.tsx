import { Text } from "@/gluestack/text";
import { VStack } from "@/gluestack/vstack";
import { Token } from "@/registries/TokenRegistry";

import { UseTransferAmountFormResult } from "../../_hooks/useTransferAmountForm";

import TransferAmountInput from "./TransferAmountInput";
import TransferAmountSummary from "./TransferAmountSummary";

type TransferAmountProps = { token: Token; form: UseTransferAmountFormResult };

const TransferAmount = (props: TransferAmountProps) => {
  const { token } = props;
  const { transferableAmount, feeAmount, amountError, handleAmountSubmit } = props.form;

  return (
    <VStack className="items-center min-h-[185px] py-3 gap-y-2">
      <Text className="w-full font-bold">金額</Text>
      <TransferAmountInput
        token={token}
        transferableAmount={transferableAmount}
        handleAmountSubmit={handleAmountSubmit}
      />
      <TransferAmountSummary token={token} transferableAmount={transferableAmount} feeAmount={feeAmount} />
      {amountError && <Text className="w-full text-primary-600 text-sm font-bold mt-2">{amountError}</Text>}
    </VStack>
  );
};

export default TransferAmount;
