import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { Address, Hex } from "viem";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import { SecureStorePrivateKeyRepository } from "@/infrastructure/secureStore/SecureStorePrivateKeyRepository";

export const useGetPrivateKeyByWallet = (
  options?: UseMutationOptions<Hex, Error, Address, unknown>
): UseMutationResult<Hex, Error, Address, unknown> => {
  return useMutation<Hex, Error, Address>({
    ...options,
    mutationKey: ["GetPrivateKeyByWallet"],
    mutationFn: async wallet => {
      const privateKeyRepository = await SecureStorePrivateKeyRepository.getInstance();
      return PrivateKeysService.getPrivateKeyByWallet(wallet, privateKeyRepository);
    }
  });
};
