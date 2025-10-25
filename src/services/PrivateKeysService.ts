import { SQLiteDatabase } from "expo-sqlite";
import { Hex } from "viem";

import { CustomError } from "@/exceptions";
import { StorePrivateKeyCommand } from "@/models/privateKey";
import { SqlAddressesRepository } from "@/repositories/AddressesRepository";
import { SecureStorePrivateKeysRepository } from "@/repositories/PrivateKeysRepository";
import { SqlUserSettingRepository } from "@/repositories/UserSettingRepository";

export const PrivateKeysService = {
  async getDefaultPrivateKey(db: SQLiteDatabase): Promise<Hex> {
    try {
      const userSetting = await SqlUserSettingRepository.get(db);
      if (!userSetting) throw new CustomError("ユーザの設定情報の取得に失敗しました。");

      const defaultWallet = await (async () => {
        const defaultWalletBySetting = userSetting.defaultWallet;
        if (!!defaultWalletBySetting) return defaultWalletBySetting;

        const myAddresses = await SqlAddressesRepository.listMine(db);
        if (myAddresses.length === 0) throw new CustomError("ウォレットが未作成です。");
        return myAddresses[0].address;
      })();

      const pk = await SecureStorePrivateKeysRepository.get(defaultWallet);
      return pk;
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりデフォルトウォレットの取得に失敗しました。`);
    }
  },

  async storePrivateKey(db: SQLiteDatabase, command: StorePrivateKeyCommand): Promise<void> {
    const { name, wallet, privateKey } = command;
    try {
      const stored = await SecureStorePrivateKeysRepository.get(wallet);
      if (!!stored) throw new CustomError("このプライベートキーは既に登録されています。");

      await SecureStorePrivateKeysRepository.store(wallet, privateKey);

      const found = await SqlAddressesRepository.get(db, wallet);
      if (!!found) return;

      await SqlAddressesRepository.create(db, { name, address: wallet, isMine: true });
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりプライベートキーの作成に失敗しました。`);
    }
  }
};
