import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import type { UpdateAddressCommand } from "@/models/address";
import { AddressesService } from "@/services/AddressesService";

export const useUpdateAddress = (
  options?: UseMutationOptions<void, Error, UpdateAddressCommand, unknown>
): UseMutationResult<void, Error, UpdateAddressCommand, unknown> => {
  const db = useSQLiteContext();
  return useMutation<void, Error, UpdateAddressCommand>({
    ...options,
    mutationKey: ["UpdateAddress"],
    mutationFn: command => AddressesService.updateAddress(db, command)
  });
};
