import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";
import type { StorePrivateKeyCommand } from "@/domain/privateKey";

export const useStorePrivateKey = (
  options?: UseMutationOptions<void, Error, StorePrivateKeyCommand, unknown>
): UseMutationResult<void, Error, StorePrivateKeyCommand, unknown> => {
  const db = useSQLiteContext();
  return useMutation<void, Error, StorePrivateKeyCommand>({
    ...options,
    mutationKey: ["StorePrivateKey"],
    mutationFn: command => PrivateKeysService.storePrivateKey(db, command)
  });
};
