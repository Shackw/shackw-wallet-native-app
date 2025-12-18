import { Address, Hex } from "viem";

import { ListPrivateKeysCommand, PrivateKeyModel, StorePrivateKeyCommand } from "@/domain/privateKey";
import { CustomError } from "@/shared/exceptions";

import { privateKeyResultToDomain } from "../mappers/privateKey";
import { IAddressesRepository } from "../ports/IAddressesRepository";
import { IPrivateKeyRepository } from "../ports/IPrivateKeyRepository";
import { IUserSettingRepository } from "../ports/IUserSettingRepository";

export const PrivateKeysService = {
  async listPrivateKeys(
    command: ListPrivateKeysCommand,
    addressesRepository: IAddressesRepository,
    privateKeyRepository: IPrivateKeyRepository
  ): Promise<PrivateKeyModel[]> {
    const { isAuthRequired } = command;

    try {
      if (isAuthRequired) await privateKeyRepository.reload();

      const myAddresses = await addressesRepository.listMine();

      const privateKeyResult = privateKeyRepository.list();
      const domains = privateKeyResult.map(p => {
        {
          const name = myAddresses.find(a => a.address.toLowerCase() === p.wallet.toLowerCase())?.name ?? "";
          return privateKeyResultToDomain(name, p);
        }
      });
      return domains;
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりプライベートキーの取得に失敗しました。`);
    }
  },

  async getPrivateKeyByWallet(wallet: Address, privateKeyRepository: IPrivateKeyRepository): Promise<Hex> {
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

  async storePrivateKey(
    command: StorePrivateKeyCommand,
    addressesRepository: IAddressesRepository,
    userSettingRepository: IUserSettingRepository,
    privateKeyRepository: IPrivateKeyRepository
  ): Promise<void> {
    const { name, wallet, privateKey } = command;
    try {
      const stored = privateKeyRepository.get(wallet);
      if (!!stored) throw new CustomError("このプライベートキーは既に登録されています。");

      await privateKeyRepository.upsert({
        wallet: wallet.toLowerCase() as Address,
        privateKey: privateKey.toLowerCase() as Hex,
        createdAt: new Date().getTime()
      });

      const found = await addressesRepository.get(wallet);
      if (!!found) return;

      await addressesRepository.create({ name, address: wallet, isMine: true });

      await userSettingRepository.patch({ defaultWallet: wallet });
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりプライベートキーの作成に失敗しました。`);
    }
  },

  async deletePrivateKeyByWallet(
    wallet: Address,
    addressesRepository: IAddressesRepository,
    userSettingRepository: IUserSettingRepository,
    privateKeyRepository: IPrivateKeyRepository
  ): Promise<void> {
    try {
      const userSetting = await userSettingRepository.get();
      const defaultWallet = userSetting?.defaultWallet?.toLowerCase() ?? undefined;
      if (!defaultWallet || defaultWallet === wallet.toLocaleLowerCase())
        throw new CustomError("デフォルトに設定されているウォレットを削除することはできません。");

      await privateKeyRepository.delete(wallet);

      await addressesRepository.delete(wallet);
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりプライベートキーの削除に失敗しました。`);
    }
  }
};
