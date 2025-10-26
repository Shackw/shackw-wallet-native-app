import { SQLiteDatabase } from "expo-sqlite";

import type { SupportChain } from "@/configs/chain";

import type { Address } from "viem";

export interface IUserSettingRepository {
  get(db: SQLiteDatabase): Promise<UserSettingResult | null>;
  patch(db: SQLiteDatabase, query: PatchUserSettingQuery): Promise<void>;
}

export type UserSettingResult = {
  name: string;
  selectedChain: SupportChain;
  defaultWallet: Address | null;
  updatedAt: Date;
  createdAt: Date;
};

export type PatchUserSettingQuery = { selectedChain?: SupportChain; defaultWallet?: Address | null };
