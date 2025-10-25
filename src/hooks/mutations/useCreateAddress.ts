import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import type { CreateAddressCommand } from "@/models/address";
import { AddressesService } from "@/services/AddressesService";

export const useCreateAddress = (
  options?: UseMutationOptions<void, Error, CreateAddressCommand, unknown>
): UseMutationResult<void, Error, CreateAddressCommand, unknown> => {
  const db = useSQLiteContext();
  return useMutation<void, Error, CreateAddressCommand>({
    ...options,
    mutationKey: ["CreateAddress"],
    mutationFn: command => AddressesService.createAddress(db, command)
  });
};
