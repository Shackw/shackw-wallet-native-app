import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { Address, Hex } from "viem";

import { PrivateKeysService } from "@/services/PrivateKeysService";

export const useGetPrivateKeyByWallet = (
  options?: UseMutationOptions<Hex, Error, Address, unknown>
): UseMutationResult<Hex, Error, Address, unknown> => {
  const db = useSQLiteContext();
  return useMutation<Hex, Error, Address>({
    ...options,
    mutationKey: ["GetPrivateKeyByWallet"],
    mutationFn: wallet => PrivateKeysService.getPrivateKeyByWallet(db, wallet)
  });
};
