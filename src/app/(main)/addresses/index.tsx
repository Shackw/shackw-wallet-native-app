import { Scan } from "lucide-react-native";

import { ScreenContainer } from "@/components/Container";
import { useBoolean } from "@/hooks/useBoolean";
import { Fab, FabIcon } from "@/vendor/gluestack-ui/fab";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import AddressesMine from "./_components/AddressesMine";
import AddressesSearcher from "./_components/AddressesSearcher";
import AddressesTable from "./_components/AddressesTable";
import useAddressesRow from "./_hooks/useAddressesRow";

const AddressesScreen = () => {
  const { addressRows, mineRow, searchText, isError, setSearchText, refetch } = useAddressesRow();
  const [isScaning, setIsScaning] = useBoolean(false);

  return (
    <ScreenContainer title="アドレス帳" className="bg-white rounded-t-2xl">
      <VStack className="p-3 gap-y-4 flex-1">
        <AddressesSearcher searchText={searchText} setSearchText={setSearchText} />
        <AddressesMine address={mineRow.address} name={mineRow.name} refetchAddresses={refetch} />
        <AddressesTable rows={addressRows} isError={isError} refetchAddresses={refetch} />
      </VStack>
      <Fab size="xl" placement="bottom right" className="bg-primary-400 rounded-3xl" onPress={setIsScaning.on}>
        <FabIcon as={Scan} className="p-5" />
      </Fab>
    </ScreenContainer>
  );
};

export default AddressesScreen;
