import { Address } from "viem";

import { CustomError } from "@/exceptions";
import type { AddressModel, MutateAddressCommand } from "@/models/address";
import { SqlAddressesRepository } from "@/repositories/AddressesRepository";

import type { SQLiteDatabase } from "expo-sqlite";

export const AddressesService = {
  async listAddress(db: SQLiteDatabase): Promise<AddressModel[]> {
    try {
      const addresses = await SqlAddressesRepository.list(db);
      return addresses;
    } catch {
      throw new Error("アドレス一覧の取得に失敗しました。");
    }
  },

  async listMyAddress(db: SQLiteDatabase): Promise<AddressModel[]> {
    try {
      const addresses = await SqlAddressesRepository.listMine(db);
      return addresses;
    } catch {
      throw new Error("自分のアドレス一覧の取得に失敗しました。");
    }
  },

  async createAddress(db: SQLiteDatabase, command: MutateAddressCommand): Promise<void> {
    const { address } = command;
    try {
      const found = await SqlAddressesRepository.get(db, address);
      if (!!found) throw new CustomError("このアドレスは既に登録されています。");

      await SqlAddressesRepository.create(db, { ...command, isMine: false });
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error(`不明なエラーによりアドレスの作成に失敗しました。`);
    }
  },

  async updateAddress(db: SQLiteDatabase, command: MutateAddressCommand): Promise<void> {
    const { address } = command;
    try {
      const found = await SqlAddressesRepository.get(db, address);
      if (!found) throw new CustomError("指定のアドレスは登録されていません。");

      if (found.isMine && found.address !== address)
        throw new CustomError("自分のアドレスを変更することはできません。");

      await SqlAddressesRepository.update(db, command);
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error("不明なエラーによりアドレスの更新に失敗しました。");
    }
  },

  async deleteAddress(db: SQLiteDatabase, address: Address): Promise<void> {
    try {
      const found = await SqlAddressesRepository.get(db, address);
      if (!found) throw new CustomError("指定のアドレスは登録されていません。");

      if (found.isMine) throw new CustomError("自分のアドレスを削除することはできません。");

      await SqlAddressesRepository.delete(db, address);
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof CustomError) throw new Error(error.message);

      throw new Error("不明なエラーによりアドレスの削除に失敗しました");
    }
  }
};
