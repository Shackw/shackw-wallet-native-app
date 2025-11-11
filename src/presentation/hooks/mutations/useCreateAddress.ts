import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { AddressesService } from "@/application/services/AddressesService";
import type { MutateAddressCommand } from "@/domain/address";
import { SqlAddressesRepository } from "@/infrastructure/sql/SqlAddressesRepository";

export const useCreateAddress = (
  options?: UseMutationOptions<void, Error, MutateAddressCommand, unknown>
): UseMutationResult<void, Error, MutateAddressCommand, unknown> => {
  const db = useSQLiteContext();

  return useMutation<void, Error, MutateAddressCommand>({
    ...options,
    mutationKey: ["CreateAddress"],
    mutationFn: command => {
      const addressesRepository = new SqlAddressesRepository(db);
      return AddressesService.createAddress(addressesRepository, command);
    }
  });
};
