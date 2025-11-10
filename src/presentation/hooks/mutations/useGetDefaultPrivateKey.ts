import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { Hex } from "viem";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import { SecureStorePrivateKeyRepository } from "@/infrastructure/secureStore/SecureStorePrivateKeyRepository";
import { SqlAddressesRepository } from "@/infrastructure/sql/SqlAddressesRepository";
import { SqlUserSettingRepository } from "@/infrastructure/sql/SqlUserSettingRepository";

export const useGetDefaultPrivateKey = (
  options?: UseMutationOptions<Hex | null, Error, void, unknown>
): UseMutationResult<Hex | null, Error, void, unknown> => {
  const db = useSQLiteContext();

  return useMutation<Hex | null, Error, void>({
    ...options,
    mutationKey: ["GetDefaultPrivateKey"],
    mutationFn: async () => {
      const addressesRepository = new SqlAddressesRepository(db);
      const userSettingRepository = new SqlUserSettingRepository(db);
      const privateKeyRepository = await SecureStorePrivateKeyRepository.getInstance();
      return PrivateKeysService.getDefaultPrivateKey(addressesRepository, userSettingRepository, privateKeyRepository);
    }
  });
};
