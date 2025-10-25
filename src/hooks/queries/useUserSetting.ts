import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import type { UserSettingModel } from "@/models/userSetting";
import { UserSettingService } from "@/services/UserSettingService";

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
