import { ScreenContainer } from "@/components/Container";
import { useBoolean } from "@/hooks/useBoolean";
import { Fab, FabIcon } from "@/vendor/gluestack-ui/fab";
import { AddIcon } from "@/vendor/gluestack-ui/icon";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import AddressesMine from "./_components/AddressesMine";
import AddressesSearcher from "./_components/AddressesSearcher";
import AddressMutateField from "./_components/AddressMutateField";
import useAddressesRow from "./_hooks/useAddressesRow";

const AddressesScreen = () => {
  const { mineRow, searchText, setSearchText, refetch } = useAddressesRow();
  const [isCreating, setIsCreating] = useBoolean(false);

  return (
    <ScreenContainer title="アドレス帳" className="bg-white rounded-t-2xl">
      <VStack className="p-3 gap-y-4 flex-1">
        <AddressesSearcher searchText={searchText} setSearchText={setSearchText} />
        <AddressesMine address={mineRow.address} name={mineRow.name} refetchAddresses={refetch} />
      </VStack>
      <Fab size="xl" placement="bottom right" className="bg-primary-400 rounded-3xl" onPress={setIsCreating.on}>
        <FabIcon as={AddIcon} className="p-5" />
      </Fab>
      <AddressMutateField
        mode="create"
        componentProps={{ title: "新規アドレス作成", size: "lg", isOpen: isCreating, onClose: setIsCreating.off }}
      />
    </ScreenContainer>
  );
};

export default AddressesScreen;
