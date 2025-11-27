import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { Address } from "viem";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import { SecureStorePrivateKeyRepository } from "@/infrastructure/secureStore/SecureStorePrivateKeyRepository";
import { SqlAddressesRepository } from "@/infrastructure/sql/SqlAddressesRepository";
import { SqlUserSettingRepository } from "@/infrastructure/sql/SqlUserSettingRepository";

export const useDeletePrivateKey = (
  options?: UseMutationOptions<void, Error, Address, unknown>
): UseMutationResult<void, Error, Address, unknown> => {
  const db = useSQLiteContext();

  return useMutation<void, Error, Address>({
    ...options,
    mutationKey: ["DeletePrivateKey"],
    mutationFn: async wallet => {
      const addressesRepository = new SqlAddressesRepository(db);
      const userSettingRepository = new SqlUserSettingRepository(db);
      const privateKeyRepository = await SecureStorePrivateKeyRepository.getInstance();
      return PrivateKeysService.deletePrivateKeyByWallet(
        wallet,
        addressesRepository,
        userSettingRepository,
        privateKeyRepository
      );
    }
  });
};
