import { useLocalSearchParams } from "expo-router";
import { Plus } from "lucide-react-native";
import { useEffect } from "react";
import { Address } from "viem";

import AddressMutateField from "@/components/Addresses/AddressMutateField";
import { IconButton } from "@/components/Button";
import { ScreenContainer } from "@/components/Container";
import Searcher from "@/components/Searcher";
import useAddressesRow from "@/hooks/useAddressesRow";
import { useBoolean } from "@/hooks/useBoolean";
import { theme } from "@/styles/theme";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import AddressesMine from "./_components/AddressesMine";
import AddressesTable from "./_components/AddressesTable";

const AddressesScreen = () => {
  const [isCreating, setIsCreating] = useBoolean(false);
  const params = useLocalSearchParams<{ address?: Address; name?: string }>();

  const { addressRows, mineRow, searchTextRef, isError, handleChangeSearchText, refetch } = useAddressesRow();

  useEffect(() => {
    if (!!params.address && !!params.name) setIsCreating.on();
  }, [params.address, params.name, setIsCreating]);

  return (
    <ScreenContainer appBarProps={{ title: "アドレス帳" }} className="bg-white rounded-t-2xl">
      <VStack className="p-3 gap-y-4 flex-1">
        <Searcher
          inputRef={searchTextRef}
          handleChange={handleChangeSearchText}
          componetProps={{ className: "w-full mt-3" }}
        />
        <AddressesMine address={mineRow.address} name={mineRow.name} refetchAddresses={refetch} />
        <VStack className="flex-1 pb-8">
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

      <AddressMutateField
        mode="create"
        initName={params.name}
        initAddress={params.address}
        refetch={refetch}
        componentProps={{ title: "新規アドレス作成", size: "lg", isOpen: isCreating, onClose: setIsCreating.off }}
      />
    </ScreenContainer>
  );
};

export default AddressesScreen;
