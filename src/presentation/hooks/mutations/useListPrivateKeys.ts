import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import { ListPrivateKeysCommand, PrivateKeyModel } from "@/domain/privateKey";
import { SecureStorePrivateKeyRepository } from "@/infrastructure/secureStore/SecureStorePrivateKeyRepository";
import { SqlAddressesRepository } from "@/infrastructure/sql/SqlAddressesRepository";

export const useListPrivateKeys = (
  options?: UseMutationOptions<PrivateKeyModel[], Error, ListPrivateKeysCommand, unknown>
): UseMutationResult<PrivateKeyModel[], Error, ListPrivateKeysCommand, unknown> => {
  const db = useSQLiteContext();

  return useMutation<PrivateKeyModel[], Error, ListPrivateKeysCommand>({
    ...options,
    mutationKey: ["ListPrivateKeys"],
    mutationFn: async command => {
      const addressesRepository = new SqlAddressesRepository(db);
      const privateKeyRepository = await SecureStorePrivateKeyRepository.getInstance();
      return PrivateKeysService.listPrivateKeys(command, addressesRepository, privateKeyRepository);
    }
  });
};
