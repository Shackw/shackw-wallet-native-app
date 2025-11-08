import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { Hex } from "viem";

import { PrivateKeysService } from "@/application/services/PrivateKeysService";

export const useGetDefaultPrivateKey = (
  options?: UseMutationOptions<Hex | null, Error, void, unknown>
): UseMutationResult<Hex | null, Error, void, unknown> => {
  const db = useSQLiteContext();
  return useMutation<Hex | null, Error, void>({
    ...options,
    mutationKey: ["GetDefaultPrivateKey"],
    mutationFn: () => PrivateKeysService.getDefaultPrivateKey(db)
  });
};
