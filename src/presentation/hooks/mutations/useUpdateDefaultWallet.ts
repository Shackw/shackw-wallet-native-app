import { useMutation } from "@tanstack/react-query";

import { UserSettingService } from "@/application/services/UserSettingService";
import type { UpdateDefaultWalletCommand } from "@/domain/userSetting";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

export const useUpdateDefaultWallet = (
  options?: UseMutationOptions<void, Error, UpdateDefaultWalletCommand, unknown>
): UseMutationResult<void, Error, UpdateDefaultWalletCommand, unknown> => {
  const { userSettingRepository } = useDependenciesContainerContext();

  return useMutation<void, Error, UpdateDefaultWalletCommand>({
    ...options,
    mutationKey: ["UpdateDefaultWallet"],
    mutationFn: command => UserSettingService.updateDefaultWallet(command, userSettingRepository)
  });
};
