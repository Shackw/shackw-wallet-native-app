import AddressMutateField from "@/components/Addresses/AddressMutateField";
import Anchor from "@/components/Anchor";
import { TextButton } from "@/components/Button";
import { SUPPORT_CHAINS } from "@/configs/chain";
import { shortenAddress } from "@/helpers/address";
import { formatIsoString } from "@/helpers/datetime";
import { useBoolean } from "@/hooks/useBoolean";
import { useUserSettingContext } from "@/providers/UserSettingProvider";
import { Box } from "@/vendor/gluestack-ui/box";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { TableRow } from "@/vendor/gluestack-ui/table";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useHistoryRows, { HistoryViewModel } from "../_hooks/useHistoryRows";

type HistoryTableRowProps = {
  row: HistoryViewModel;
  refetchHistory: ReturnType<typeof useHistoryRows>["refetch"];
};

const HistoryTableRow = (props: HistoryTableRowProps) => {
  const { row, refetchHistory } = props;
  const { currentChain } = useUserSettingContext();
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
              {SUPPORT_CHAINS[currentChain].blockExplorers?.default ? (
                <Anchor
                  href={`${SUPPORT_CHAINS[currentChain].blockExplorers.default.url}/tx/${txHash}`}
                  className="font-bold text-secondary-500"
                >{`tx: ${shortenAddress(txHash, 5)}`}</Anchor>
              ) : (
                <Text className="font-bold text-secondary-500">{`tx: ${shortenAddress(txHash, 5)}`}</Text>
              )}
            </HStack>
            <>
              {counterparty.name ? (
                <Text className="font-bold" size="lg">
                  {counterparty.name}
                </Text>
              ) : (
                <TextButton
                  textProps={{ className: "font-bold text-secondary-800", size: "lg" }}
                  onPress={setIsAddingAddress.on}
                >
                  {shortenAddress(counterparty.address, 12)}
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
