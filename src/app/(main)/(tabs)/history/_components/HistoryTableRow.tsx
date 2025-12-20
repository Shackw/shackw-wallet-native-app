import { CHAINS } from "@/config/chain";
import AddressMutateField from "@/presentation/components/Addresses/AddressMutateField";
import Anchor from "@/presentation/components/Anchor";
import { TextButton } from "@/presentation/components/Button";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { TableRow } from "@/presentation/components/gluestack-ui/table";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { formatIsoString } from "@/shared/helpers/datetime";

import useHistoryRows, { HistoryViewModel } from "../_hooks/useHistoryRows";

type HistoryTableRowProps = {
  row: HistoryViewModel;
  refetchHistory: ReturnType<typeof useHistoryRows>["refetch"];
};

const HistoryTableRow = (props: HistoryTableRowProps) => {
  const { row, refetchHistory } = props;
  const { currentChain } = useWalletPreferencesContext();
  const { txHash, displayValue, counterparty, anchorColor, transferredAt } = row;

  const [isAddingAddress, setIsAddingAddress] = useBoolean(false);

  return (
    <>
      <TableRow className="w-full">
        <HStack className="w-full py-2">
          <Box className="h-full w-1.5 rounded-full" style={{ backgroundColor: anchorColor }} />
          <VStack className="w-full py-1 pl-3 pr-6 gap-y-1">
            <HStack className="justify-between">
              <Text className="font-bold text-secondary-500">{formatIsoString(transferredAt)}</Text>
              {CHAINS[currentChain].blockExplorers?.default ? (
                <Anchor
                  href={`${CHAINS[currentChain].blockExplorers.default.url}/tx/${txHash}`}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                  className="font-bold text-secondary-500 w-32"
                >{`tx: ${txHash}`}</Anchor>
              ) : (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="middle"
                  className="font-bold text-secondary-500 w-32"
                >{`tx: ${txHash}`}</Text>
              )}
            </HStack>
            <>
              {counterparty.name ? (
                <Text className="font-bold" size="lg">
                  {counterparty.name}
                </Text>
              ) : (
                <TextButton
                  textProps={{
                    className: "font-bold text-secondary-800 w-[65%]",
                    size: "lg",
                    numberOfLines: 1,
                    ellipsizeMode: "middle"
                  }}
                  onPress={setIsAddingAddress.on}
                >
                  {counterparty.address}
                </TextButton>
              )}
            </>
            <Text className="font-bold text-right" size="xl">
              {displayValue}
            </Text>
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
