import { Address } from "viem";

import type { AddressModel, CreateAddressCommand, UpdateAddressCommand } from "@/models/address";
import { SqlAddressesRepository } from "@/repositories/AddressesRepository";

import type { SQLiteDatabase } from "expo-sqlite";

export const AddressesService = {
  async listAddress(db: SQLiteDatabase): Promise<AddressModel[]> {
    try {
      const addresses = await SqlAddressesRepository.list(db);
      return addresses;
    } catch {
      throw new Error("アドレス一覧の取得に失敗しました");
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
        throw new Error(error.message);
      }
      throw new Error(`不明なエラーによりアドレスの作成に失敗しました。`);
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
        throw new Error(error.message);
      }
      throw new Error("不明なエラーによりアドレスの更新に失敗しました。");
    }
  },

  async deleteAddress(db: SQLiteDatabase, address: Address): Promise<void> {
    try {
      const found = await SqlAddressesRepository.get(db, address);
      if (!found) throw new Error("指定のアドレスは登録されていません。");

      await SqlAddressesRepository.delete(db, address);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("不明なエラーによりアドレスの削除に失敗しました");
    }
  }
};
