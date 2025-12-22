import { ScrollView } from "react-native";

import { ListPrivateKeysCommand } from "@/domain/privateKey";
import { Table, TableBody } from "@/presentation/components/gluestack-ui/table";

import { PrivateKeyRows } from "./PrivateKeyScreenSuspence";
import PrivateKeyTableRow from "./PrivateKeyTableRow";

type PrivateKeyTableProps = {
  rows: PrivateKeyRows[];
  fetchPrivateKeys: (variables: ListPrivateKeysCommand) => Promise<void>;
};

const PrivateKeyTable = (props: PrivateKeyTableProps) => {
  const { rows, fetchPrivateKeys } = props;

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Table className="w-full overflow-y-auto">
        <TableBody className="w-full">
          {rows.map((row, index) => (
            <PrivateKeyTableRow
              row={row}
              index={index}
              fetchPrivateKeys={fetchPrivateKeys}
              key={`private-key-${row.wallet}`}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollView>
  );
};

export default PrivateKeyTable;
