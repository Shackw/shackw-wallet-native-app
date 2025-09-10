import { Token } from "@/registries/TokenRegistry";
import { theme } from "@/styles/theme";
import { Spinner } from "@/vendor/gluestack-ui/spinner";
import { Table, TableBody, TableData, TableRow } from "@/vendor/gluestack-ui/table";
import { Text } from "@/vendor/gluestack-ui/text";

import useHistoryRows, { HistoryTerm } from "../_hooks/useHistoryRows";

type HistoryTableProps = { token: Token; term: HistoryTerm };

const HistoryTable = (props: HistoryTableProps) => {
  const { token, term } = props;
  const { historyRows, isError } = useHistoryRows({
    token,
    ...term
  });

  if (!historyRows && isError) return <Text>エラーが発生しました。</Text>;

  if (!historyRows) return <Spinner color={theme.colors.primary[400]} size={34.3} />;

  if (historyRows.length === 0) return <Text>データがありません。</Text>;

  return (
    <Table className="w-full overflow-y-auto">
      <TableBody>
        {historyRows.map((row, index) => (
          <TableRow key={`${row.token}-history-${index}`}>
            <TableData>{row.counterparty}</TableData>
            <TableData>{`${row.value}${row.token}`}</TableData>
            <TableData>{row.transactionAt}</TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
