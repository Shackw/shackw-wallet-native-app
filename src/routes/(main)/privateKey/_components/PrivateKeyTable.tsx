import { ScrollView } from "react-native";

import type { ListPrivateKeysCommand } from "@/domain/privateKey";
import { Table, TableBody } from "@/presentation/components/gluestack-ui/table";
import { cn } from "@/shared/helpers/cn";

import PrivateKeyTableRow from "./PrivateKeyTableRow";

import type { PrivateKeyRows } from "./PrivateKeyScreenSuspence";

type PrivateKeyTableProps = {
  rows: PrivateKeyRows[];
  fetchPrivateKeys: (variables: ListPrivateKeysCommand) => Promise<void>;
};

const PrivateKeyTable = (props: PrivateKeyTableProps) => {
  const { rows, fetchPrivateKeys } = props;

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <Table className={cn("w-full", "overflow-y-auto")}>
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
