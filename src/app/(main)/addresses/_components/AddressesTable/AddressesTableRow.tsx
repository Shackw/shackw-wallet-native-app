import { Avatar, AvatarFallbackText } from "@/presentation/components/gluestack-ui/avatar";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { TableRow } from "@/presentation/components/gluestack-ui/table";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { type AddressRow, useAddressesRow } from "@/presentation/hooks/useAddressesRow";
import { shortenAddress } from "@/shared/helpers/address";

import AddressesTableRowMenu from "./AddressesTableRowMenu";

type AddressesTableRowProps = {
  row: AddressRow;
  refetchAddresses: ReturnType<typeof useAddressesRow>["refetch"];
};

const AddressesTableRow = (props: AddressesTableRowProps) => {
  const { row, refetchAddresses } = props;

  return (
    <TableRow className="w-full py-3">
      <HStack className="w-full gap-x-4 items-center">
        <Avatar size="md" className="mx-2">
          <AvatarFallbackText>{row.name}</AvatarFallbackText>
        </Avatar>
        <VStack className="gap-y-1">
          <Text size="lg" className="font-bold">
            {row.name}
          </Text>
          <Text size="md" className="font-bold text-secondary-500">
            {shortenAddress(row.address, 15)}
          </Text>
        </VStack>
        <AddressesTableRowMenu row={row} refetchAddresses={refetchAddresses} />
      </HStack>
    </TableRow>
  );
};

export default AddressesTableRow;
