import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import type { StorePrivateKeyCommand } from "@/models/privateKey";
import { PrivateKeyService } from "@/services/PrivateKeyService";

export const useStorePrivateKey = (
  options?: UseMutationOptions<void, Error, StorePrivateKeyCommand, unknown>
): UseMutationResult<void, Error, StorePrivateKeyCommand, unknown> => {
  const db = useSQLiteContext();
  return useMutation<void, Error, StorePrivateKeyCommand>({
    ...options,
    mutationKey: ["StorePrivateKey"],
    mutationFn: address => PrivateKeyService.storePrivateKey(db, address)
  });
};
