import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { UserSettingService } from "@/application/services/UserSettingService";
import type { UpdateSelectedChainCommand } from "@/domain/userSetting";

export const useUpdateSelectedChain = (
  options?: UseMutationOptions<void, Error, UpdateSelectedChainCommand, unknown>
): UseMutationResult<void, Error, UpdateSelectedChainCommand, unknown> => {
  const db = useSQLiteContext();
  return useMutation<void, Error, UpdateSelectedChainCommand>({
    ...options,
    mutationKey: ["UpdateSelectedChain"],
    mutationFn: command => UserSettingService.updateSelectedChain(db, command)
  });
};
