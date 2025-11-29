import { useLocalSearchParams } from "expo-router";
import { Plus } from "lucide-react-native";
import { useEffect, useMemo } from "react";
import { Address } from "viem";

import AddressMutateField from "@/presentation/components/Addresses/AddressMutateField";
import { IconButton } from "@/presentation/components/Button";
import { ScreenContainer } from "@/presentation/components/Container";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import Searcher from "@/presentation/components/Searcher";
import { useAddressesRow } from "@/presentation/hooks/useAddressesRow";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { theme } from "@/presentation/styles/theme";

import AddressesMine from "./_components/AddressesMine";
import AddressesTable from "./_components/AddressesTable";

const AddressesScreen = () => {
  const [isCreating, setIsCreating] = useBoolean(false);
  const params = useLocalSearchParams<{ address?: Address; name?: string }>();

  const { mineRow, addressRows, searchTextRef, isError, handleChangeSearchText, refetch } = useAddressesRow();

  const myAddressRows = useMemo(() => addressRows?.filter(a => a.isMine), [addressRows]);
  const otherAddressRows = useMemo(() => addressRows?.filter(a => !a.isMine), [addressRows]);

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
        <VStack className="flex-1 pb-8 gap-y-4">
          <VStack className="h-[208px]">
            <HStack className="items-center justify-between">
              <Text className="font-bold text-secondary-500">自分のウォレット</Text>
            </HStack>
            <AddressesTable rows={myAddressRows} isError={isError} refetchAddresses={refetch} />
          </VStack>
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
            <AddressesTable rows={otherAddressRows} isError={isError} refetchAddresses={refetch} />
          </VStack>
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
