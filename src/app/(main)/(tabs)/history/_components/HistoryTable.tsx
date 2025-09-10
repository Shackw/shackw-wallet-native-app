import { ScrollView } from "react-native";

import Anchor from "@/components/Anchor";
import { DEFAULT_CHAIN } from "@/configs/chain";
import { shortenAddress } from "@/helpers/address";
import { Token } from "@/registries/TokenRegistry";
import { theme } from "@/styles/theme";
import { Box } from "@/vendor/gluestack-ui/box";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Spinner } from "@/vendor/gluestack-ui/spinner";
import { Table, TableBody, TableRow } from "@/vendor/gluestack-ui/table";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useHistoryRows, { HistoryTerm } from "../_hooks/useHistoryRows";

type HistoryTableProps = { token: Token; term: HistoryTerm };

const HistoryTable = (props: HistoryTableProps) => {
  const { token, term } = props;
  const { historyRows, isError } = useHistoryRows({
    token,
    ...term
  });

  if (!historyRows && isError)
    return (
      <VStack className="flex-1 justify-center items-center pb-32">
        <Text>エラーが発生しました。</Text>
      </VStack>
    );

  if (!historyRows)
    return (
      <VStack className="flex-1 justify-center items-center pb-32">
        <Spinner color={theme.colors.primary[400]} size={34.3} />
      </VStack>
    );

  if (historyRows.length === 0)
    return (
      <VStack className="flex-1 justify-center items-center pb-32">
        <Text>データがありません。</Text>
      </VStack>
    );

  console.log(DEFAULT_CHAIN.blockExplorers);

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
      <Table className="w-full overflow-y-auto">
        <TableBody className="w-full">
          {historyRows.map(({ txHash, token, value, counterparty, direction, transactionAt }, index) => (
            <TableRow key={`${token}-history-${index}`} className="w-full">
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
                  <Text className="font-bold text-right" size="xl">{`${value} ${token}`}</Text>
                </VStack>
              </HStack>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollView>
  );
};

export default HistoryTable;
