import { Plus, Scan } from "lucide-react-native";

import AddressesSearcher from "@/components/Addresses/AddressesSearcher";
import AddressMutateField from "@/components/Addresses/AddressMutateField";
import { IconButton } from "@/components/Button";
import { ScreenContainer } from "@/components/Container";
import useAddressesRow from "@/hooks/useAddressesRow";
import { useBoolean } from "@/hooks/useBoolean";
import { theme } from "@/styles/theme";
import { Fab, FabIcon } from "@/vendor/gluestack-ui/fab";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import AddressesMine from "./_components/AddressesMine";
import AddressesTable from "./_components/AddressesTable";

const AddressesScreen = () => {
  const { addressRows, mineRow, searchText, isError, setSearchText, refetch } = useAddressesRow();

  const [isScaning, setIsScaning] = useBoolean(false);
  const [isCreating, setIsCreating] = useBoolean(false);

  return (
    <ScreenContainer title="アドレス帳" className="bg-white rounded-t-2xl">
      <VStack className="p-3 gap-y-4 flex-1">
        <AddressesSearcher
          searchText={searchText}
          setSearchText={setSearchText}
          componetProps={{ className: "w-full mt-3" }}
        />
        <AddressesMine address={mineRow.address} name={mineRow.name} refetchAddresses={refetch} />
        <VStack className="flex-1 pb-12">
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
          <AddressesTable rows={addressRows} isError={isError} refetchAddresses={refetch} />
        </VStack>
      </VStack>

      <Fab size="xl" placement="bottom right" className="bg-primary-400 rounded-3xl" onPress={setIsScaning.on}>
        <FabIcon as={Scan} className="p-5" />
      </Fab>

      <AddressMutateField
        mode="create"
        refetch={refetch}
        componentProps={{ title: "新規アドレス作成", size: "lg", isOpen: isCreating, onClose: setIsCreating.off }}
      />
    </ScreenContainer>
  );
};

export default AddressesScreen;
