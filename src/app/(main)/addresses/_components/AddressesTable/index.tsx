import { Plus } from "lucide-react-native";
import { ScrollView } from "react-native";

import { IconButton } from "@/components/Button";
import { useBoolean } from "@/hooks/useBoolean";
import { theme } from "@/styles/theme";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Spinner } from "@/vendor/gluestack-ui/spinner";
import { Table, TableBody } from "@/vendor/gluestack-ui/table";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useAddressesRow, { AddressRows } from "../../_hooks/useAddressesRow";
import AddressMutateField from "../AddressMutateField";

import AddressesTableRow from "./AddressesTableRow";

type AddressesTableProps = {
  rows: AddressRows;
  isError: boolean;
  refetchAddresses: ReturnType<typeof useAddressesRow>["refetch"];
};

const AddressesTable = (props: AddressesTableProps) => {
  const { rows, isError, refetchAddresses } = props;
  const [isCreating, setIsCreating] = useBoolean(false);

  if (!rows && isError)
    return (
      <VStack className="flex-1 justify-center items-center pb-32">
        <Text className="font-bold text-secondary-500">エラーが発生しました</Text>
      </VStack>
    );

  if (!rows)
    return (
      <VStack className="flex-1 justify-center items-center pb-32">
        <Spinner color={theme.colors.primary[400]} size={34.3} />
      </VStack>
    );

  if (rows.length === 0)
    return (
      <VStack className="flex-1 justify-center items-center pb-32">
        <Text className="font-bold text-secondary-500">アドレスがありません</Text>
      </VStack>
    );

  return (
    <VStack className="flex-1">
      <HStack className="items-center justify-between">
        <Text className="font-bold text-secondary-500">すべてのアドレス</Text>
        <IconButton
          action="default"
          iconSize={28}
          icon={Plus}
          iconColor={theme.colors.secondary[700]}
          onPress={setIsCreating.on}
        />
      </HStack>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
        <Table className="w-full overflow-y-auto">
          <TableBody className="w-full">
            {rows.map((row, index) => (
              <AddressesTableRow row={row} refetchAddresses={refetchAddresses} key={`addresses-${index}`} />
            ))}
          </TableBody>
        </Table>
      </ScrollView>

      <AddressMutateField
        mode="create"
        refetchAddresses={refetchAddresses}
        componentProps={{ title: "新規アドレス作成", size: "lg", isOpen: isCreating, onClose: setIsCreating.off }}
      />
    </VStack>
  );
};

export default AddressesTable;
