import { useMutation } from "@tanstack/react-query";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import type { EnablePrivateKeyCommand } from "@/domain/privateKey";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

export const useEnablePrivateKey = (
  options?: UseMutationOptions<void, Error, EnablePrivateKeyCommand, unknown>
): UseMutationResult<void, Error, EnablePrivateKeyCommand, unknown> => {
  const { privateKeyRepository } = useDependenciesContainerContext();

  return useMutation<void, Error, EnablePrivateKeyCommand>({
    ...options,
    mutationKey: ["EnablePrivateKey"],
    mutationFn: async command => PrivateKeysService.enablePrivateKeyByWallet(command, privateKeyRepository)
  });
};
