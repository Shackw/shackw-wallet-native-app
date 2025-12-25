import { CHAINS } from "@/config/chain";
import Anchor from "@/presentation/components/Anchor";
import { AppText } from "@/presentation/components/AppText";
import { TextButton } from "@/presentation/components/Button";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { TableRow } from "@/presentation/components/gluestack-ui/table";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import { formatIsoString } from "@/shared/helpers/datetime";
import AddressMutateField from "@mainc/addresses/AddressMutateField";

import useHistoryRows, { HistoryViewModel } from "../_hooks/useHistoryRows";

type HistoryTableRowProps = {
  row: HistoryViewModel;
  refetchHistory: ReturnType<typeof useHistoryRows>["refetch"];
};

const HistoryTableRow = (props: HistoryTableRowProps) => {
  const { row, refetchHistory } = props;
  const { currentChain } = useWalletPreferencesContext();
  const { txHash, displayValue, counterparty, anchorColor, transferredAt } = row;

  const tw = useTw();

  const [isAddingAddress, setIsAddingAddress] = useBoolean(false);

  return (
    <>
      <TableRow className="w-full">
        <HStack className={cn("w-full", tw.py(2))}>
          <Box className="h-full w-1.5 rounded-full" style={{ backgroundColor: anchorColor }} />
          <VStack className={cn("w-full", tw.py(1), tw.pl(3), tw.pr(6), tw.gapY(1))}>
            <HStack className="justify-between">
              <AppText t="md" className="font-bold text-secondary-500">
                {formatIsoString(transferredAt)}
              </AppText>
              {CHAINS[currentChain].blockExplorers?.default ? (
                <Anchor
                  href={`${CHAINS[currentChain].blockExplorers.default.url}/tx/${txHash}`}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                  className="font-bold text-secondary-500 w-32"
                >{`tx: ${txHash}`}</Anchor>
              ) : (
                <AppText t="md" className="font-bold text-secondary-500 w-32" oneLine>
                  {`tx: ${txHash}`}
                </AppText>
              )}
            </HStack>
            <>
              {counterparty.name ? (
                <AppText t="lg" className="font-bold">
                  {counterparty.name}
                </AppText>
              ) : (
                <TextButton
                  textProps={{
                    className: "font-bold text-secondary-800 w-[65%]",
                    numberOfLines: 1,
                    ellipsizeMode: "middle"
                  }}
                  onPress={setIsAddingAddress.on}
                >
                  {counterparty.address}
                </TextButton>
              )}
            </>
            <AppText t="xl" className="font-bold text-right">
              {displayValue}
            </AppText>
          </VStack>
        </HStack>
      </TableRow>

      <AddressMutateField
        key={`create:${counterparty.address}`}
        mode="create"
        initName={counterparty.name ?? ""}
        initAddress={counterparty.address}
        disableFields={["address"]}
        refetch={refetchHistory}
        componentProps={{ title: "アドレス登録", size: "lg", isOpen: isAddingAddress, onClose: setIsAddingAddress.off }}
      />
    </>
  );
};

export default HistoryTableRow;
