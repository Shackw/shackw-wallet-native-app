import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { Token } from "@/registries/TokenRegistry";
import { toAllowedStr } from "@/shared/helpers/tokenUnits";

type ConfirmAmountProps = {
  title: string;
  amount: number;
  sendToken: Token;
  feeToken: Token;
  feeDecimals: number;
};

const ConfirmAmount = (props: ConfirmAmountProps) => {
  const { title, amount, sendToken, feeToken, feeDecimals } = props;
  return (
    <VStack className="w-full gap-y-2">
      <HStack className="gap-x-2">
        <Box className="w-1.5 bg-primary-500" />
        <Text className="font-bold">{title}</Text>
      </HStack>
      <VStack className="border-[0.5px] border-secondary-300 p-4 bg-secondary-50 rounded-xl">
        <VStack className="gap-y-1">
          <Text className="font-bold text-secondary-600">金額</Text>
          <Text className="font-bold text-secondary-800 text-right">{`${toAllowedStr(amount, sendToken)} ${sendToken}`}</Text>
        </VStack>
        <VStack className="gap-y-1">
          <Text className="font-bold text-secondary-600">手数料</Text>
          <Text className="font-bold text-secondary-800 text-right">{`${feeDecimals} ${feeToken}`}</Text>
        </VStack>
        <VStack className="gap-y-1">
          <Text className="font-bold text-secondary-600">合計額</Text>
          {sendToken === feeToken ? (
            <Text className="font-bold text-secondary-800 text-right">{`${amount + feeDecimals} ${feeToken}`}</Text>
          ) : (
            <>
              <Text className="font-bold text-secondary-800 text-right">{`${toAllowedStr(amount, sendToken)} ${sendToken}`}</Text>
              <Text className="font-bold text-secondary-800 text-right">{`+ ${feeDecimals} ${feeToken}`}</Text>
            </>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default ConfirmAmount;
