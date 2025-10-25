import { SQLiteDatabase } from "expo-sqlite";

import { CustomError } from "@/exceptions";
import type { UpdateDefaultWalletCommand, UpdateSelectedChainCommand } from "@/models/userSetting";
import { SqlUserSettingRepository } from "@/repositories/UserSettingRepository";
import type { UpdateUserSettingQuery, UserSettingResult } from "@/repositories/UserSettingRepository/interface";

export const UserSettingService = {
  async getUserSetting(db: SQLiteDatabase): Promise<UserSettingResult> {
    try {
      const userSetting = await SqlUserSettingRepository.get(db);
      if (!userSetting) throw new CustomError("ユーザの設定情報の取得に失敗しました。");

      return userSetting;
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりユーザの設定情報の取得に失敗しました。`);
    }
  },

  async updateSelectedChain(db: SQLiteDatabase, command: UpdateSelectedChainCommand): Promise<void> {
    const { selectedChain } = command;

    try {
      const userSetting = await SqlUserSettingRepository.get(db);
      if (!userSetting) throw new CustomError("ユーザの設定情報の取得に失敗しました。");

      const query: UpdateUserSettingQuery = { ...userSetting, selectedChain };

      await SqlUserSettingRepository.update(db, query);
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりチェーンの切り替えに失敗しました。`);
    }
  },

  async updateDefaultWallet(db: SQLiteDatabase, command: UpdateDefaultWalletCommand): Promise<void> {
    const { defaultWallet } = command;

    try {
      const userSetting = await SqlUserSettingRepository.get(db);
      if (!userSetting) throw new CustomError("ユーザの設定情報の取得に失敗しました。");

      const query: UpdateUserSettingQuery = { ...userSetting, defaultWallet };
      await SqlUserSettingRepository.update(db, query);
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりウォレットの切り替えに失敗しました。`);
    }
  }
};
