import { toAllowedStr } from "@/helpers/tokenUnits";
import { Token } from "@/registries/TokenRegistry";
import { Box } from "@/vendor/gluestack-ui/box";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type TransferConfirmAmountProps = {
  amount: number;
  sendToken: Token;
  feeToken: Token;
  feeDecimals: number;
};

const TransferConfirmAmount = (props: TransferConfirmAmountProps) => {
  const { amount, sendToken, feeToken, feeDecimals } = props;
  return (
    <VStack className="w-full gap-y-2">
      <HStack className="gap-x-2">
        <Box className="w-1.5 bg-primary-500" />
        <Text className="font-bold">送金額・手数料</Text>
      </HStack>
      <VStack className="border-[0.5px] border-secondary-300 px-5 py-6 bg-secondary-50 rounded-xl gap-y-3">
        <VStack className="gap-y-1">
          <Text className="font-bold text-secondary-600">送金額</Text>
          <Text
            className="font-bold text-secondary-800 text-right"
            size="lg"
          >{`${toAllowedStr(amount, sendToken)} ${sendToken}`}</Text>
        </VStack>
        <VStack className="gap-y-1">
          <Text className="font-bold text-secondary-600">手数料</Text>
          <Text
            className="font-bold text-secondary-800 text-right"
            size="lg"
          >{`${toAllowedStr(feeDecimals, sendToken)} ${feeToken}`}</Text>
        </VStack>
        <VStack className="gap-y-1">
          <Text className="font-bold text-secondary-600">合計額</Text>
          {sendToken === feeToken ? (
            <Text
              className="font-bold text-secondary-800 text-right"
              size="lg"
            >{`${toAllowedStr(amount + feeDecimals, sendToken)} ${feeToken}`}</Text>
          ) : (
            <>
              <Text
                className="font-bold text-secondary-800 text-right"
                size="lg"
              >{`${toAllowedStr(amount, sendToken)} ${sendToken}`}</Text>
              <Text
                className="font-bold text-secondary-800 text-right"
                size="lg"
              >{`+ ${toAllowedStr(feeDecimals, sendToken)} ${feeToken}`}</Text>
            </>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default TransferConfirmAmount;
