import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { Hex } from "viem";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

export const useGetDefaultPrivateKey = (
  options?: UseMutationOptions<Hex | null, Error, void, unknown>
): UseMutationResult<Hex | null, Error, void, unknown> => {
  const { addressesRepository, userSettingRepository, privateKeyRepository } = useDependenciesContainerContext();

  return useMutation<Hex | null, Error, void>({
    ...options,
    mutationKey: ["GetDefaultPrivateKey"],
    mutationFn: async () =>
      PrivateKeysService.getDefaultPrivateKey(addressesRepository, userSettingRepository, privateKeyRepository)
  });
};
