import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { Address } from "viem";

import { AddressesService } from "@/application/services/AddressesService";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

export const useDeleteAddress = (
  options?: UseMutationOptions<void, Error, Address, unknown>
): UseMutationResult<void, Error, Address, unknown> => {
  const { addressesRepository } = useDependenciesContainerContext();

  return useMutation<void, Error, Address>({
    ...options,
    mutationKey: ["DeleteAddress"],
    mutationFn: address => AddressesService.deleteAddress(addressesRepository, address)
  });
};
