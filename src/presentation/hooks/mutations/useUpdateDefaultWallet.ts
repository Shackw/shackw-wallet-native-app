import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { UserSettingService } from "@/application/services/UserSettingService";
import type { UpdateDefaultWalletCommand } from "@/domain/userSetting";
import { SqlUserSettingRepository } from "@/infrastructure/sql/SqlUserSettingRepository";

export const useUpdateDefaultWallet = (
  options?: UseMutationOptions<void, Error, UpdateDefaultWalletCommand, unknown>
): UseMutationResult<void, Error, UpdateDefaultWalletCommand, unknown> => {
  const db = useSQLiteContext();

  return useMutation<void, Error, UpdateDefaultWalletCommand>({
    ...options,
    mutationKey: ["UpdateDefaultWallet"],
    mutationFn: command => {
      const userSettingRepository = new SqlUserSettingRepository(db);
      return UserSettingService.updateDefaultWallet(userSettingRepository, command);
    }
  });
};
