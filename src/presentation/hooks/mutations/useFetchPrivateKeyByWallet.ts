import { useMutation } from "@tanstack/react-query";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import type { GetPrivateKeyByWalletCommand, PrivateKeyModel } from "@/domain/privateKey";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

export const useFetchPrivateKeyByWallet = (
  options?: UseMutationOptions<PrivateKeyModel, Error, GetPrivateKeyByWalletCommand, unknown>
): UseMutationResult<PrivateKeyModel, Error, GetPrivateKeyByWalletCommand, unknown> => {
  const { addressesRepository, privateKeyRepository } = useDependenciesContainerContext();

  return useMutation<PrivateKeyModel, Error, GetPrivateKeyByWalletCommand>({
    ...options,
    mutationKey: ["FetchPrivateKeyByWallet"],
    mutationFn: async command =>
      PrivateKeysService.getPrivateKeyByWallet(command, addressesRepository, privateKeyRepository)
  });
};
