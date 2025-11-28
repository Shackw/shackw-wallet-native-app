import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { UserSettingService } from "@/application/services/UserSettingService";
import type { UpdateDefaultChainCommand } from "@/domain/userSetting";
import { SqlUserSettingRepository } from "@/infrastructure/sql/SqlUserSettingRepository";

export const useUpdateDefaultChain = (
  options?: UseMutationOptions<void, Error, UpdateDefaultChainCommand, unknown>
): UseMutationResult<void, Error, UpdateDefaultChainCommand, unknown> => {
  const db = useSQLiteContext();

  return useMutation<void, Error, UpdateDefaultChainCommand>({
    ...options,
    mutationKey: ["UpdateSelectedChain"],
    mutationFn: command => {
      const userSettingRepository = new SqlUserSettingRepository(db);
      return UserSettingService.updateDefaultChain(command, userSettingRepository);
    }
  });
};
