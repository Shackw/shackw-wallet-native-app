import { SQLiteDatabase } from "node_modules/expo-sqlite/build/SQLiteDatabase";
import { Address } from "viem";

import { AddressRow } from "@/db/schema";

import { addressRowToResult } from "./mapper";

import type { AddressesResult, CreateAddressQuery, IAddressesRepository, UpdateAddressQuery } from "./interface";

export const SqlAddressesRepository: IAddressesRepository = {
  async get(db: SQLiteDatabase, address: Address): Promise<AddressesResult | null> {
    const stmt = await db.prepareAsync(`
      SELECT address, name, is_mine, updated_at, created_at
      FROM addresses
      WHERE address = $address
    `);

    try {
      const result = await stmt.executeAsync<AddressRow>({ $address: address });
      const row = await result.getFirstAsync();
      if (!row) return null;
      return addressRowToResult(row);
    } finally {
      await stmt.finalizeAsync();
    }
  },

  async list(db: SQLiteDatabase): Promise<AddressesResult[]> {
    throw new Error("Function not implemented.");
  },

  async create(db: SQLiteDatabase, query: CreateAddressQuery): Promise<void> {
    throw new Error("Function not implemented.");
  },

  async update(db: SQLiteDatabase, query: UpdateAddressQuery): Promise<void> {
    throw new Error("Function not implemented.");
  },

  async delete(db: SQLiteDatabase, address: Address): Promise<void> {
    throw new Error("Function not implemented.");
  }
};
