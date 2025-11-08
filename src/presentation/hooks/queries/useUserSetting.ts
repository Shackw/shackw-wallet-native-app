import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { UserSettingService } from "@/application/services/UserSettingService";
import type { UserSettingModel } from "@/domain/userSetting";

export const useUserSetting = (
  options?: Partial<UseQueryOptions<UserSettingModel>>
): UseQueryResult<UserSettingModel> => {
  const db = useSQLiteContext();
  return useQuery({
    ...options,
    queryKey: ["UserSetting"],
    queryFn: () => UserSettingService.getUserSetting(db)
  });
};
