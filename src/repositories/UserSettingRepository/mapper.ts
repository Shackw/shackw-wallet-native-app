import type { UserSettingWithAddressNameRow } from "@/db/schema";

import type { UserSettingResult } from "./interface";

export const userSettingRowToResult = (dbModel: UserSettingWithAddressNameRow): UserSettingResult => {
  return {
    name: dbModel.name,
    selectedChain: dbModel.selected_chain,
    defaultWallet: dbModel.default_wallet,
    updatedAt: new Date(dbModel.updated_at * 1000),
    createdAt: new Date(dbModel.created_at * 1000)
  };
};
