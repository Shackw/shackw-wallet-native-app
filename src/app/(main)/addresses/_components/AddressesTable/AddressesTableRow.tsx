import { shortenAddress } from "@/helpers/address";
import { Avatar, AvatarFallbackText } from "@/vendor/gluestack-ui/avatar";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { TableRow } from "@/vendor/gluestack-ui/table";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useAddressesRow, { AddressRow } from "../../_hooks/useAddressesRow";

import AddressesTableRowMenu from "./AddressesTableRowMenu";

type AddressesTableRowProps = {
  row: AddressRow;
  refetchAddresses: ReturnType<typeof useAddressesRow>["refetch"];
};

const AddressesTableRow = (props: AddressesTableRowProps) => {
  const { refetchAddresses } = props;
  const { address, name } = props.row;

  return (
    <TableRow className="w-full py-3">
      <HStack className="w-full gap-x-4 items-center">
        <Avatar size="md" className="mx-2">
          <AvatarFallbackText>{name}</AvatarFallbackText>
        </Avatar>
        <VStack className="gap-y-1">
          <Text size="lg" className="font-bold">
            {name}
          </Text>
          <Text size="md" className="font-bold text-secondary-500">
            {shortenAddress(address, 15)}
          </Text>
        </VStack>
        <AddressesTableRowMenu name={name} address={address} refetchAddresses={refetchAddresses} />
      </HStack>
    </TableRow>
  );
};

export default AddressesTableRow;
