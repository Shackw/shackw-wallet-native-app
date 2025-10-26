import { SQLiteDatabase } from "expo-sqlite";
import { Hex } from "viem";

import { PrivateKeySecureStore } from "@/db/secureStores/PrivateKeySecureStore";
import { CustomError } from "@/exceptions";
import { StorePrivateKeyCommand } from "@/models/privateKey";
import { SqlAddressesRepository } from "@/repositories/AddressesRepository";
import { SqlUserSettingRepository } from "@/repositories/UserSettingRepository";

export const PrivateKeysService = {
  async getDefaultPrivateKey(db: SQLiteDatabase): Promise<Hex | null> {
    const privateKeySecureStore = await PrivateKeySecureStore.getInstance();
    try {
      const userSetting = await SqlUserSettingRepository.get(db);
      if (!userSetting) throw new CustomError("ユーザの設定情報の取得に失敗しました。");

      const defaultWallet = await (async () => {
        const defaultWalletBySetting = userSetting.defaultWallet;
        if (!!defaultWalletBySetting) return defaultWalletBySetting;

        const myAddresses = await SqlAddressesRepository.listMine(db);
        if (myAddresses.length === 0) return null;
        return myAddresses[0].address;
      })();

      if (!defaultWallet) return null;

      const pk = privateKeySecureStore.get(defaultWallet.toLowerCase());
      if (!pk) return null;

      return pk.privateKey;
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりデフォルトウォレットの取得に失敗しました。`);
    }
  },

  async storePrivateKey(db: SQLiteDatabase, command: StorePrivateKeyCommand): Promise<void> {
    const { name, wallet, privateKey } = command;

    const privateKeySecureStore = await PrivateKeySecureStore.getInstance();
    try {
      const stored = privateKeySecureStore.get(wallet);
      if (!!stored) throw new CustomError("このプライベートキーは既に登録されています。");

      await privateKeySecureStore.upsert({ wallet, privateKey, createdAt: new Date().getTime() });

      const found = await SqlAddressesRepository.get(db, wallet);
      if (!!found) return;

      await SqlAddressesRepository.create(db, { name, address: wallet, isMine: true });

      await SqlUserSettingRepository.patch(db, { defaultWallet: wallet });
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりプライベートキーの作成に失敗しました。`);
    }
  }
};
