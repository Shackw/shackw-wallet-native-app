import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import type { UpdateDefaultWalletCommand } from "@/models/userSetting";
import { UserSettingService } from "@/services/UserSettingService";

export const useUpdateDefaultWallet = (
  options?: UseMutationOptions<void, Error, UpdateDefaultWalletCommand, unknown>
): UseMutationResult<void, Error, UpdateDefaultWalletCommand, unknown> => {
  const db = useSQLiteContext();
  return useMutation<void, Error, UpdateDefaultWalletCommand>({
    ...options,
    mutationKey: ["UpdateDefaultWallet"],
    mutationFn: command => UserSettingService.updateDefaultWallet(db, command)
  });
};
