import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import { ListPrivateKeysCommand, PrivateKeyModel } from "@/domain/privateKey";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

export const useFetchPrivateKeys = (
  options?: UseMutationOptions<PrivateKeyModel[], Error, ListPrivateKeysCommand, unknown>
): UseMutationResult<PrivateKeyModel[], Error, ListPrivateKeysCommand, unknown> => {
  const { addressesRepository, privateKeyRepository } = useDependenciesContainerContext();

  return useMutation<PrivateKeyModel[], Error, ListPrivateKeysCommand>({
    ...options,
    mutationKey: ["ListPrivateKeys"],
    mutationFn: async command => PrivateKeysService.listPrivateKeys(command, addressesRepository, privateKeyRepository)
  });
};
