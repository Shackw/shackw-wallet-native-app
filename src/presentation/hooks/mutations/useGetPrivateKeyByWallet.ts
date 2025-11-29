import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { Address, Hex } from "viem";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

export const useGetPrivateKeyByWallet = (
  options?: UseMutationOptions<Hex, Error, Address, unknown>
): UseMutationResult<Hex, Error, Address, unknown> => {
  const { privateKeyRepository } = useDependenciesContainerContext();

  return useMutation<Hex, Error, Address>({
    ...options,
    mutationKey: ["GetPrivateKeyByWallet"],
    mutationFn: async wallet => PrivateKeysService.getPrivateKeyByWallet(wallet, privateKeyRepository)
  });
};
