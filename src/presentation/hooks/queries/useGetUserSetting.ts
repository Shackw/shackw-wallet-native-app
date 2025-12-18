import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

import { UserSettingService } from "@/application/services/UserSettingService";
import type { UserSettingModel } from "@/domain/userSetting";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

export const useGetUserSetting = (
  options?: Partial<UseQueryOptions<UserSettingModel>>
): UseQueryResult<UserSettingModel> => {
  const { userSettingRepository } = useDependenciesContainerContext();

  return useQuery({
    ...options,
    queryKey: ["UserSetting"],
    queryFn: () => UserSettingService.getUserSetting(userSettingRepository)
  });
};
