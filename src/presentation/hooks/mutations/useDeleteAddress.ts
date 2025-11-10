import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { Address } from "viem";

import { AddressesService } from "@/application/services/AddressesService";
import { SqlAddressesRepository } from "@/infrastructure/sql/SqlAddressesRepository";

export const useDeleteAddress = (
  options?: UseMutationOptions<void, Error, Address, unknown>
): UseMutationResult<void, Error, Address, unknown> => {
  const db = useSQLiteContext();

  return useMutation<void, Error, Address>({
    ...options,
    mutationKey: ["DeleteAddress"],
    mutationFn: address => {
      const addressesRepository = new SqlAddressesRepository(db);
      return AddressesService.deleteAddress(addressesRepository, address);
    }
  });
};
