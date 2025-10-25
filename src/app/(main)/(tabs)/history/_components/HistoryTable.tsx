import { ScrollView } from "react-native";

import TableSuspence from "@/components/TableSuspence";
import { Token } from "@/registries/TokenRegistry";
import { Table, TableBody } from "@/vendor/gluestack-ui/table";

import useHistoryRows, { HistoryTerm } from "../_hooks/useHistoryRows";

import HistoryTableRow from "./HistoryTableRow";

type HistoryTableProps = { token: Token; term: HistoryTerm };

const HistoryTable = (props: HistoryTableProps) => {
  const { token, term } = props;
  const { historyRows, isError, refetch } = useHistoryRows({
    token,
    ...term
  });

  return (
    <TableSuspence title="取引履歴" rows={historyRows} isError={isError}>
      {rows => (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
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
