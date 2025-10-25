import { SQLiteDatabase } from "expo-sqlite";

import type { UserSettingWithAddressNameRow } from "@/db/schema";

import { userSettingRowToResult } from "./mapper";

import type { IUserSettingRepository, UpdateUserSettingQuery, UserSettingResult } from "./interface";

export const SqlUserSettingRepository: IUserSettingRepository = {
  async get(db: SQLiteDatabase): Promise<UserSettingResult | null> {
    const stmt = await db.prepareAsync(`
      SELECT
        a.name AS name,
        us.selected_chain AS selected_chain,
        us.default_wallet AS default_wallet,
        us.updated_at AS updated_at,
        us.created_at AS created_at
      FROM user_setting AS us
      LEFT JOIN addresses AS a
        ON a.address = us.default_wallet
      WHERE us.id = 1
      LIMIT 1
    `);
    try {
      const result = await stmt.executeAsync<UserSettingWithAddressNameRow>();
      const row = await result.getFirstAsync();
      if (!row) return null;
      return userSettingRowToResult(row);
    } finally {
      await stmt.finalizeAsync();
    }
  },

  async update(db: SQLiteDatabase, query: UpdateUserSettingQuery): Promise<void> {
    const { selectedChain, defaultWallet } = query;
    const stmt = await db.prepareAsync(`
      UPDATE user_setting
      SET
        selected_chain = $selectedChain,
        default_wallet = $defaultWallet,
        updated_at = strftime('%s','now')
      WHERE id = 1
    `);
    try {
      await stmt.executeAsync({
        $selectedChain: selectedChain,
        $defaultWallet: defaultWallet ? defaultWallet.toLowerCase() : null
      });
    } finally {
      await stmt.finalizeAsync();
    }
  }
};
