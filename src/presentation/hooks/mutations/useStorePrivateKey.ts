import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import type { StorePrivateKeyCommand } from "@/domain/privateKey";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

export const useStorePrivateKey = (
  options?: UseMutationOptions<void, Error, StorePrivateKeyCommand, unknown>
): UseMutationResult<void, Error, StorePrivateKeyCommand, unknown> => {
  const { addressesRepository, userSettingRepository, privateKeyRepository } = useDependenciesContainerContext();

  return useMutation<void, Error, StorePrivateKeyCommand>({
    ...options,
    mutationKey: ["StorePrivateKey"],
    mutationFn: async command =>
      PrivateKeysService.storePrivateKey(command, addressesRepository, userSettingRepository, privateKeyRepository)
  });
};
