import { useMutation } from "@tanstack/react-query";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import type { Address } from "viem";

export const useDeletePrivateKey = (
  options?: UseMutationOptions<void, Error, Address, unknown>
): UseMutationResult<void, Error, Address, unknown> => {
  const { addressesRepository, userSettingRepository, privateKeyRepository } = useDependenciesContainerContext();

  return useMutation<void, Error, Address>({
    ...options,
    mutationKey: ["DeletePrivateKey"],
    mutationFn: async wallet =>
      PrivateKeysService.deletePrivateKeyByWallet(
        wallet,
        addressesRepository,
        userSettingRepository,
        privateKeyRepository
      )
  });
};
