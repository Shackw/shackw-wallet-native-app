import React from "react";

import { shortenAddress } from "@/helpers/address";
import useAddressesRow from "@/hooks/useAddressesRow";
import { AddressModel } from "@/models/address";
import { Avatar, AvatarFallbackText } from "@/vendor/gluestack-ui/avatar";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

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
