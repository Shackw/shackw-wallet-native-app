import { Text, HStack, VStack } from "@gluestack-ui/themed";

import { formatUpToN } from "@/helpers/number";
import { Token } from "@/registries/TokenRegistry";

type TransferAmountSummaryProps = {
  token: Token;
  transferableAmount: number;
  feeAmount: number;
};

const TransferAmountSummary = (props: TransferAmountSummaryProps) => {
  const { token, transferableAmount, feeAmount } = props;

  return (
    <VStack w="$full" rowGap="$1">
      <HStack w="$full">
        <Text color="$secondary700" fontSize="$md" w="50%" pl="$3" pr="$2.5" textAlign="right" lineHeight="$sm">
          送金可能額
        </Text>
        <Text
          color="$secondary700"
          fontSize="$md"
          w="50%"
          px="$2.5"
          pr="$3"
          textAlign="left"
          lineHeight="$sm"
        >{`${formatUpToN(transferableAmount, 3)} ${token}`}</Text>
      </HStack>
      <HStack w="$full">
        <Text color="$secondary700" fontSize="$md" w="50%" pl="$3" pr="$2.5" textAlign="right" lineHeight="$sm">
          送金手数料
        </Text>
        <Text
          color="$secondary700"
          fontSize="$md"
          w="50%"
          px="$2.5"
          pr="$3"
          textAlign="left"
          lineHeight="$sm"
        >{`${formatUpToN(feeAmount, 3)} ${token}`}</Text>
      </HStack>
    </VStack>
  );
};

export default TransferAmountSummary;
