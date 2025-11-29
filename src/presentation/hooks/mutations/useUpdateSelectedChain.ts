import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";

import { UserSettingService } from "@/application/services/UserSettingService";
import type { UpdateDefaultChainCommand } from "@/domain/userSetting";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

export const useUpdateDefaultChain = (
  options?: UseMutationOptions<void, Error, UpdateDefaultChainCommand, unknown>
): UseMutationResult<void, Error, UpdateDefaultChainCommand, unknown> => {
  const { userSettingRepository } = useDependenciesContainerContext();

  return useMutation<void, Error, UpdateDefaultChainCommand>({
    ...options,
    mutationKey: ["UpdateSelectedChain"],
    mutationFn: command => UserSettingService.updateDefaultChain(command, userSettingRepository)
  });
};
