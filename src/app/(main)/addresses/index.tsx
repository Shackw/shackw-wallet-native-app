import { ScreenContainer } from "@/components/Container";
import { Box } from "@/vendor/gluestack-ui/box";

import AddressesMine from "./_components/AddressesMine";
import AddressesSearcher from "./_components/AddressesSearcher";
import useAddressesRow from "./_hooks/useAddressesRow";

const AddressesScreen = () => {
  const { mineRow, searchText, setSearchText, refetch } = useAddressesRow();

  return (
    <ScreenContainer title="アドレス帳" className="bg-white rounded-t-2xl">
      <Box className="p-3 flex-1">
        <AddressesSearcher searchText={searchText} setSearchText={setSearchText} />
        <AddressesMine address={mineRow.address} name={mineRow.name} refetchAddresses={refetch} />
      </Box>
    </ScreenContainer>
  );
};

export default AddressesScreen;
