import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import type { StorePrivateKeyCommand } from "@/models/privateKey";
import { PrivateKeysService } from "@/services/PrivateKeysService";

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
