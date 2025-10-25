import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import type { MutateAddressCommand } from "@/models/address";
import { AddressesService } from "@/services/AddressesService";

export const useUpdateAddress = (
  options?: UseMutationOptions<void, Error, MutateAddressCommand, unknown>
): UseMutationResult<void, Error, MutateAddressCommand, unknown> => {
  const db = useSQLiteContext();
  return useMutation<void, Error, MutateAddressCommand>({
    ...options,
    mutationKey: ["UpdateAddress"],
    mutationFn: command => AddressesService.updateAddress(db, command)
  });
};
