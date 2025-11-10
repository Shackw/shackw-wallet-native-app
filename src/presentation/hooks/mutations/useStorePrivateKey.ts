import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import type { StorePrivateKeyCommand } from "@/domain/privateKey";
import { SecureStorePrivateKeyRepository } from "@/infrastructure/secureStore/SecureStorePrivateKeyRepository";
import { SqlAddressesRepository } from "@/infrastructure/sql/SqlAddressesRepository";
import { SqlUserSettingRepository } from "@/infrastructure/sql/SqlUserSettingRepository";

export const useStorePrivateKey = (
  options?: UseMutationOptions<void, Error, StorePrivateKeyCommand, unknown>
): UseMutationResult<void, Error, StorePrivateKeyCommand, unknown> => {
  const db = useSQLiteContext();

  return useMutation<void, Error, StorePrivateKeyCommand>({
    ...options,
    mutationKey: ["StorePrivateKey"],
    mutationFn: async command => {
      const addressesRepository = new SqlAddressesRepository(db);
      const userSettingRepository = new SqlUserSettingRepository(db);
      const privateKeyRepository = await SecureStorePrivateKeyRepository.getInstance();
      return PrivateKeysService.storePrivateKey(
        addressesRepository,
        userSettingRepository,
        privateKeyRepository,
        command
      );
    }
  });
};
