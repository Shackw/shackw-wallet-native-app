import Anchor from "@/components/Anchor";
import { DEFAULT_CHAIN } from "@/configs/chain";
import { shortenAddress } from "@/helpers/address";
import { toAllowedStr } from "@/helpers/tokenUnits";
import { Box } from "@/vendor/gluestack-ui/box";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { TableRow } from "@/vendor/gluestack-ui/table";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import { HistoryViewModel } from "../_hooks/useHistoryRows";

type HistoryTableRowProps = {
  row: HistoryViewModel;
};

const HistoryTableRow = (props: HistoryTableRowProps) => {
  const { txHash, token, value, counterparty, direction, transactionAt } = props.row;

  return (
    <TableRow className="w-full">
      <HStack className="w-full py-2">
        <Box
          className="h-full w-1.5 rounded-full"
          style={{ backgroundColor: direction === "IN" ? "#A3D8F6" : "#FFA3B5" }}
        />
        <VStack className="w-full py-1 pl-3 pr-6 gap-y-1">
          <HStack className="justify-between">
            <Text className="font-bold text-secondary-500">{transactionAt}</Text>
            {DEFAULT_CHAIN.blockExplorers?.default ? (
              <Anchor
                href={`${DEFAULT_CHAIN.blockExplorers.default.url}/tx/${txHash}`}
                className="font-bold text-secondary-500"
              >{`ID: ${shortenAddress(txHash, 5)}`}</Anchor>
            ) : (
              <Text className="font-bold text-secondary-500">{`ID: ${shortenAddress(txHash, 5)}`}</Text>
            )}
          </HStack>
          <Text className="font-bold" size="lg">
            {shortenAddress(counterparty, 12)}
          </Text>
          <Text className="font-bold text-right" size="xl">{`${toAllowedStr(value, token)} ${token}`}</Text>
        </VStack>
      </HStack>
    </TableRow>
  );
};

export default HistoryTableRow;
