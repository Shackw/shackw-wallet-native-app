import { AppText } from "@/presentation/components/AppText";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { Token } from "@/registries/ChainTokenRegistry";
import { cn } from "@/shared/helpers/cn";
import { toAllowedStr } from "@/shared/helpers/tokenUnits";

type ConfirmAmountProps = {
  title: string;
  amount: number;
  sendToken: Token;
  feeToken: Token;
  feeDisplayValue: number;
};

const ConfirmAmount = (props: ConfirmAmountProps) => {
  const { title, amount, sendToken, feeToken, feeDisplayValue } = props;

  const tw = useTw();

  return (
    <VStack className={cn("w-full", tw.gapY(2))}>
      <HStack className={cn(tw.gapX(2))}>
        <Box className={cn(tw.w(1.5), "bg-primary-500")} />
        <AppText t="md" className="font-bold">
          {title}
        </AppText>
      </HStack>

      <VStack className={cn("bg-secondary-50 rounded-xl border-[0.5px] border-secondary-300", tw.p(4))}>
        <VStack className={cn(tw.gapY(1))}>
          <AppText t="sm" className="font-bold text-secondary-600">
            金額
          </AppText>
          <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
            {`${toAllowedStr(amount, sendToken)} ${sendToken}`}
          </AppText>
        </VStack>

        <VStack className={cn(tw.gapY(1))}>
          <AppText t="sm" className="font-bold text-secondary-600">
            手数料
          </AppText>
          <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
            {`${feeDisplayValue} ${feeToken}`}
          </AppText>
        </VStack>

        <VStack className={cn(tw.gapY(1))}>
          <AppText t="sm" className="font-bold text-secondary-600">
            合計額
          </AppText>
          {sendToken === feeToken ? (
            <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
              {`${amount + feeDisplayValue} ${feeToken}`}
            </AppText>
          ) : (
            <>
              <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
                {`${toAllowedStr(amount, sendToken)} ${sendToken}`}
              </AppText>
              <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
                {`+ ${feeDisplayValue} ${feeToken}`}
              </AppText>
            </>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default ConfirmAmount;
