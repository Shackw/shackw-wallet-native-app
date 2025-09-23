import { Address } from "viem";

import type { AddressModel, CreateAddressCommand, UpdateAddressCommand } from "@/models/address";
import { SqlAddressesRepository } from "@/repositories/AddressesRepository";

import type { SQLiteDatabase } from "expo-sqlite";

export const AddressesService = {
  async listAddress(db: SQLiteDatabase): Promise<AddressModel[]> {
    try {
      const addresses = await SqlAddressesRepository.list(db);
      return addresses;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`アドレス一覧の取得に失敗しました: ${error.message}`, { cause: error });
      }
      throw new Error(`アドレス一覧の取得に失敗しました（不明なエラー）: ${String(error)}`);
    }
  },

  async createAddress(db: SQLiteDatabase, command: CreateAddressCommand): Promise<void> {
    const { address } = command;
    try {
      const found = await SqlAddressesRepository.get(db, address);
      if (!!found) throw new Error("このアドレスは既に登録されています。");

      await SqlAddressesRepository.create(db, command);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`アドレスの作成に失敗しました: ${error.message}`, { cause: error });
      }
      throw new Error(`アドレスの作成に失敗しました（不明なエラー）: ${String(error)}`);
    }
  },

  async updateAddress(db: SQLiteDatabase, command: UpdateAddressCommand): Promise<void> {
    const { address } = command;
    try {
      const found = await SqlAddressesRepository.get(db, address);
      if (!found) throw new Error("指定のアドレスは登録されていません。");

      await SqlAddressesRepository.update(db, command);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`アドレスの更新に失敗しました: ${error.message}`, { cause: error });
      }
      throw new Error(`アドレスの更新に失敗しました（不明なエラー）: ${String(error)}`);
    }
  },

  async deleteAddress(db: SQLiteDatabase, address: Address): Promise<void> {
    try {
      const found = await SqlAddressesRepository.get(db, address);
      if (!found) throw new Error("指定のアドレスは登録されていません。");

      await SqlAddressesRepository.delete(db, address);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`アドレスの削除に失敗しました: ${error.message}`, { cause: error });
      }
      throw new Error(`アドレスの削除に失敗しました（不明なエラー）: ${String(error)}`);
    }
  }
};
