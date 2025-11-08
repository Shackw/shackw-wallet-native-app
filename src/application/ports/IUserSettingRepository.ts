import { SQLiteDatabase } from "expo-sqlite";

import type { SupportChain } from "@/config/chain";

import type { Address } from "viem";

export interface IUserSettingRepository {
  get(db: SQLiteDatabase): Promise<UserSettingResult | null>;
  patch(db: SQLiteDatabase, query: PatchUserSettingQuery): Promise<void>;
}

export type UserSettingResult = {
  name: string;
  defaultChain: SupportChain;
  defaultWallet: Address | null;
  updatedAt: Date;
  createdAt: Date;
};

export type PatchUserSettingQuery = { defaultChain?: SupportChain; defaultWallet?: Address | null };
