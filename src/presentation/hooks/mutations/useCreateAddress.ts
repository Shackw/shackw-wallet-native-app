import { useMutation } from "@tanstack/react-query";

import { AddressesService } from "@/application/services/AddressesService";
import type { MutateAddressCommand } from "@/domain/address";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

export const useCreateAddress = (
  options?: UseMutationOptions<void, Error, MutateAddressCommand, unknown>
): UseMutationResult<void, Error, MutateAddressCommand, unknown> => {
  const { addressesRepository } = useDependenciesContainerContext();

  return useMutation<void, Error, MutateAddressCommand>({
    ...options,
    mutationKey: ["CreateAddress"],
    mutationFn: command => AddressesService.createAddress(addressesRepository, command)
  });
};
