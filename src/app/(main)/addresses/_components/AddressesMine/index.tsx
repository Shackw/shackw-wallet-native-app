import React from "react";

import { AddressModel } from "@/domain/address";
import { AppText } from "@/presentation/components/AppText";
import { Avatar, AvatarFallbackText } from "@/presentation/components/gluestack-ui/avatar";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useAddressesRow } from "@/presentation/hooks/useAddressesRow";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import AddressesMineMenu from "./AddressesMineMenu";

type AddressesMineProps = Pick<AddressModel, "address" | "name"> & {
  refetchAddresses: ReturnType<typeof useAddressesRow>["refetch"];
};

const AddressesMine = (props: AddressesMineProps) => {
  const { address, name, refetchAddresses } = props;
  const tw = useTw();

  return (
    <VStack>
      <AppText t="sm" className="font-bold text-secondary-500">
        接続中のウォレット
      </AppText>
      <HStack className={cn("w-full items-center", tw.py(3), tw.gapX(4))}>
        <Avatar size={tw.input("xl")}>
          <AvatarFallbackText>{name}</AvatarFallbackText>
        </Avatar>

        <VStack className={cn("flex-1", tw.gapY(1))}>
          <AppText t="lg" oneLine ellipsizeMode="middle" className="font-bold w-full">
            {name}
          </AppText>
          <AppText t="lg" oneLine ellipsizeMode="middle" className="font-bold text-secondary-500 w-full">
            {address}
          </AppText>
        </VStack>

        <AddressesMineMenu address={address} name={name} refetchAddresses={refetchAddresses} />
      </HStack>
    </VStack>
  );
};

export default AddressesMine;
