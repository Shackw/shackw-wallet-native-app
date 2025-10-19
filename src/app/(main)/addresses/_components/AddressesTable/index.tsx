import { ScrollView } from "react-native";

import TableSuspence from "@/components/TableSuspence";
import useAddressesRow, { type AddressRows } from "@/hooks/useAddressesRow";
import { Table, TableBody } from "@/vendor/gluestack-ui/table";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import AddressesTableRow from "./AddressesTableRow";

type AddressesTableProps = {
  rows: AddressRows;
  isError: boolean;
  refetchAddresses: ReturnType<typeof useAddressesRow>["refetch"];
};

const AddressesTable = (props: AddressesTableProps) => {
  const { rows, isError, refetchAddresses } = props;

  return (
    <TableSuspence title="アドレス" rows={rows} isError={isError}>
      {rows => (
        <VStack className="flex-1">
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
            <Table className="w-full overflow-y-auto">
              <TableBody className="w-full">
                {rows.map((row, index) => (
                  <AddressesTableRow row={row} refetchAddresses={refetchAddresses} key={`addresses-${index}`} />
                ))}
              </TableBody>
            </Table>
          </ScrollView>
        </VStack>
      )}
    </TableSuspence>
  );
};

export default AddressesTable;
