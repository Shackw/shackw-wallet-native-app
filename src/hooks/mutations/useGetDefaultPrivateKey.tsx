import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { Hex } from "viem";

import { PrivateKeyService } from "@/services/PrivateKeyService";

export const useGetDefaultPrivateKey = (
  options?: UseMutationOptions<Hex, Error, void, unknown>
): UseMutationResult<Hex, Error, void, unknown> => {
  const db = useSQLiteContext();
  return useMutation<Hex, Error, void>({
    ...options,
    mutationKey: ["GetDefaultPrivateKey"],
    mutationFn: () => PrivateKeyService.getDefaultPrivateKey(db)
  });
};
