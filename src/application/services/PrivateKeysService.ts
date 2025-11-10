import { Address, Hex } from "viem";

import { StorePrivateKeyCommand } from "@/domain/privateKey";
import { CustomError } from "@/shared/exceptions";

import { IAddressesRepository } from "../ports/IAddressesRepository";
import { IPrivateKeyRepository } from "../ports/IPrivateKeyRepository";
import { IUserSettingRepository } from "../ports/IUserSettingRepository";

export const PrivateKeysService = {
  async getPrivateKeyByWallet(privateKeyRepository: IPrivateKeyRepository, wallet: Address): Promise<Hex> {
    try {
      const stored = privateKeyRepository.get(wallet);
      if (!stored) throw new CustomError("指定されたウォレットに紐づくプライベートキーがありません。");

      return stored.privateKey;
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりプライベートキーの取得に失敗しました。`);
    }
  },

  async getDefaultPrivateKey(
    addressesRepository: IAddressesRepository,
    userSettingRepository: IUserSettingRepository,
    privateKeyRepository: IPrivateKeyRepository
  ): Promise<Hex | null> {
    try {
      const userSetting = await userSettingRepository.get();
      if (!userSetting) throw new CustomError("ユーザの設定情報の取得に失敗しました。");

      const defaultWallet = await (async () => {
        const defaultWalletBySetting = userSetting.defaultWallet;
        if (!!defaultWalletBySetting) return defaultWalletBySetting;

        const myAddresses = await addressesRepository.listMine();
        if (myAddresses.length === 0) return null;
        return myAddresses[0].address;
      })();

      if (!defaultWallet) return null;

      const pk = privateKeyRepository.get(defaultWallet.toLowerCase());
      if (!pk) return null;

      return pk.privateKey;
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりデフォルトウォレットの取得に失敗しました。`);
    }
  },

  async storePrivateKey(
    addressesRepository: IAddressesRepository,
    userSettingRepository: IUserSettingRepository,
    privateKeyRepository: IPrivateKeyRepository,
    command: StorePrivateKeyCommand
  ): Promise<void> {
    const { name, wallet, privateKey } = command;
    try {
      const stored = privateKeyRepository.get(wallet);
      if (!!stored) throw new CustomError("このプライベートキーは既に登録されています。");

      await privateKeyRepository.upsert({ wallet, privateKey, createdAt: new Date().getTime() });

      const found = await addressesRepository.get(wallet);
      if (!!found) return;

      await addressesRepository.create({ name, address: wallet, isMine: true });

      await userSettingRepository.patch({ defaultWallet: wallet });
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりプライベートキーの作成に失敗しました。`);
    }
  }
};
