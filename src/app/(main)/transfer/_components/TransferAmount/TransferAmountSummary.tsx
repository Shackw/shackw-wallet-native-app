import { formatUpToN } from "@/helpers/number";
import { Token } from "@/registries/TokenRegistry";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type TransferAmountSummaryProps = {
  token: Token;
  transferableAmount: number;
  feeAmount: number;
};

const TransferAmountSummary = ({ token, transferableAmount, feeAmount }: TransferAmountSummaryProps) => {
  return (
    <VStack className="w-full gap-y-1">
      <HStack className="w-full flex-row">
        <Text className="text-secondary-700 text-base w-1/2 pl-3 pr-2.5 text-right leading-5">送金可能額</Text>
        <Text className="text-secondary-700 text-base w-1/2 px-2.5 pr-3 text-left leading-5">
          {`${formatUpToN(transferableAmount, 3)} ${token}`}
        </Text>
      </HStack>
      <HStack className="w-full flex-row">
        <Text className="text-secondary-700 text-base w-1/2 pl-3 pr-2.5 text-right leading-5">送金手数料</Text>
        <Text className="text-secondary-700 text-base w-1/2 px-2.5 pr-3 text-left leading-5">
          {`${formatUpToN(feeAmount, 3)} ${token}`}
        </Text>
      </HStack>
    </VStack>
  );
};

export default TransferAmountSummary;
