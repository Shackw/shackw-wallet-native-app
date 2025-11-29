import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";

import { AddressesService } from "@/application/services/AddressesService";
import type { MutateAddressCommand } from "@/domain/address";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

export const useUpdateAddress = (
  options?: UseMutationOptions<void, Error, MutateAddressCommand, unknown>
): UseMutationResult<void, Error, MutateAddressCommand, unknown> => {
  const { addressesRepository } = useDependenciesContainerContext();

  return useMutation<void, Error, MutateAddressCommand>({
    ...options,
    mutationKey: ["UpdateAddress"],
    mutationFn: command => AddressesService.updateAddress(command, addressesRepository)
  });
};
