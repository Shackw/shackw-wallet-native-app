import { Text, HStack, VStack } from "@gluestack-ui/themed";

import { TokenKind } from "@/configs/token";

type TransferAmountSummaryProps = {
  token: TokenKind;
  transferableAmount: number;
};

const TransferAmountSummary = (props: TransferAmountSummaryProps) => {
  const { token, transferableAmount } = props;

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
        >{`${transferableAmount} ${token}`}</Text>
      </HStack>
    </VStack>
  );
};

export default TransferAmountSummary;
