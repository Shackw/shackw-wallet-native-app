import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { useLastTransactionContext } from "@/presentation/providers/LastTransactionProvider";
import { theme } from "@/presentation/styles/theme";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import { formatIsoString } from "@/shared/helpers/datetime";

type HomeLastTransactionProps = {
  lastTranResult: ReturnType<typeof useLastTransactionContext>;
};

const HomeLastTransaction = (props: HomeLastTransactionProps) => {
  const { data: lastTransaction, isFetching, isError } = props.lastTranResult;

  const tw = useTw();

  if (isError) return <AppText className={cn(tw.pl(2), tw.minW(24))}>{`取得失敗`}</AppText>;

  if (lastTransaction === undefined || isFetching)
    return (
      <HStack className={cn(tw.pl(6), tw.minW(24))}>
        <Spinner size={tw.scaleNum(15)} color={theme.colors.secondary[500]} />
      </HStack>
    );

  if (lastTransaction === null) return <AppText className={cn(tw.pl(6), tw.minW(24))}>{`ー`}</AppText>;

  return <AppText className={cn(tw.pl(1))}>{formatIsoString(lastTransaction.transferredAt)}</AppText>;
};

export default HomeLastTransaction;
