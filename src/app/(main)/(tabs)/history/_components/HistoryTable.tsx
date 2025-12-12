import { ScrollView } from "react-native";

import { Table, TableBody } from "@/presentation/components/gluestack-ui/table";
import TableSuspence from "@/presentation/components/TableSuspence";
import { Token } from "@/registries/ChainTokenRegistry";

import useHistoryRows, { HistoryYearMonth } from "../_hooks/useHistoryRows";

import HistoryTableRow from "./HistoryTableRow";

type HistoryTableProps = { token: Token; yaerMonth: HistoryYearMonth };

const HistoryTable = (props: HistoryTableProps) => {
  const { token, yaerMonth } = props;
  const { historyRows, isError, refetch } = useHistoryRows({
    token,
    ...yaerMonth
  });

  return (
    <TableSuspence
      title="取引履歴"
      rows={historyRows}
      isError={isError}
      loadingMessage={`取引履歴を取得しています。\n取得完了には1~2分程度かかる場合がございます。`}
    >
      {rows => (
        <ScrollView className="flex-1" showsVerticalScrollIndicator>
          <Table className="w-full overflow-y-auto">
            <TableBody className="w-full">
              {rows.map((row, index) => (
                <HistoryTableRow row={row} key={`${token}-history-${index}`} refetchHistory={refetch} />
              ))}
            </TableBody>
          </Table>
        </ScrollView>
      )}
    </TableSuspence>
  );
};

export default HistoryTable;
