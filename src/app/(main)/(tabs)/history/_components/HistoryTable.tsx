import { ScrollView } from "react-native";

import { Token } from "@/registries/TokenRegistry";
import { theme } from "@/styles/theme";
import { Spinner } from "@/vendor/gluestack-ui/spinner";
import { Table, TableBody } from "@/vendor/gluestack-ui/table";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useHistoryRows, { HistoryTerm } from "../_hooks/useHistoryRows";

import HistoryTableRow from "./HistoryTableRow";

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
        <Text className="font-bold text-secondary-500">エラーが発生しました</Text>
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
        <Text className="font-bold text-secondary-500">データがありません</Text>
      </VStack>
    );

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
      <Table className="w-full overflow-y-auto">
        <TableBody className="w-full">
          {historyRows.map((row, index) => (
            <HistoryTableRow row={row} key={`${token}-history-${index}`} />
          ))}
        </TableBody>
      </Table>
    </ScrollView>
  );
};

export default HistoryTable;
