import React from "react";

import { AddressModel } from "@/domain/address";
import { Avatar, AvatarFallbackText } from "@/presentation/components/gluestack-ui/avatar";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import useAddressesRow from "@/presentation/hooks/useAddressesRow";
import { shortenAddress } from "@/shared/helpers/address";

import AddressesMineMenu from "./AddressesMineMenu";

type AddressesMineProps = Pick<AddressModel, "address" | "name"> & {
  refetchAddresses: ReturnType<typeof useAddressesRow>["refetch"];
};

const AddressesMine = (props: AddressesMineProps) => {
  const { address, name, refetchAddresses } = props;

  return (
    <VStack>
      <Text className="font-bold text-secondary-500">プロフィール</Text>
      <HStack className="w-full py-3 gap-x-4 items-center">
        <Avatar size="lg">
          <AvatarFallbackText>{name}</AvatarFallbackText>
        </Avatar>
        <VStack className="gap-y-1">
          <Text size="2xl" className="font-bold">
            {name}
          </Text>
          <Text size="xl" className="font-bold text-secondary-500">
            {shortenAddress(address, 12)}
          </Text>
        </VStack>
        <AddressesMineMenu address={address} name={name} refetchAddresses={refetchAddresses} />
      </HStack>
    </VStack>
  );
};

export default AddressesMine;
