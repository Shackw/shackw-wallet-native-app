import { Address } from "viem";

import { AddressRow } from "@/db/schema";

import { addressRowToResult } from "./mapper";

import type { AddressesResult, CreateAddressQuery, IAddressesRepository, UpdateAddressQuery } from "./interface";
import type { SQLiteDatabase } from "expo-sqlite";

export const SqlAddressesRepository: IAddressesRepository = {
  async get(db: SQLiteDatabase, address: Address): Promise<AddressesResult | null> {
    const stmt = await db.prepareAsync(`
      SELECT *
      FROM addresses
      WHERE address = $address
    `);
    try {
      const result = await stmt.executeAsync<AddressRow>({ $address: address.toLowerCase() });
      const row = await result.getFirstAsync();
      if (!row) return null;
      return addressRowToResult(row);
    } finally {
      await stmt.finalizeAsync();
    }
  },

  async list(db: SQLiteDatabase): Promise<AddressesResult[]> {
    const stmt = await db.prepareAsync(`
      SELECT *
      FROM addresses
      ORDER BY
        is_mine DESC,
        name COLLATE NOCASE,
        address
    `);
    try {
      const result = await stmt.executeAsync<AddressRow>();
      const rows = await result.getAllAsync();
      return rows.map(addressRowToResult);
    } finally {
      await stmt.finalizeAsync();
    }
  },

  async listMine(db: SQLiteDatabase): Promise<AddressesResult[]> {
    const stmt = await db.prepareAsync(`
      SELECT *
      FROM addresses
      WHERE is_mine = 1
      ORDER BY
        name COLLATE NOCASE,
        address
    `);
    try {
      const result = await stmt.executeAsync<AddressRow>();
      const rows = await result.getAllAsync();
      return rows.map(addressRowToResult);
    } finally {
      await stmt.finalizeAsync();
    }
  },

  async create(db: SQLiteDatabase, query: CreateAddressQuery): Promise<void> {
    const { address, name, isMine } = query;
    const stmt = await db.prepareAsync(`
      INSERT INTO addresses(address, name, is_mine)
      VALUES ($address, $name, $isMine)
    `);
    try {
      await stmt.executeAsync({ $address: address.toLowerCase(), $name: name, $isMine: isMine ? 1 : 0 });
    } finally {
      await stmt.finalizeAsync();
    }
  },

  async update(db: SQLiteDatabase, query: UpdateAddressQuery): Promise<void> {
    const { address, name } = query;
    const stmt = await db.prepareAsync(`
      UPDATE addresses
      SET name = $name, updated_at = strftime('%s','now')
      WHERE address = $address
    `);
    try {
      await stmt.executeAsync({ $address: address.toLowerCase(), $name: name });
    } finally {
      await stmt.finalizeAsync();
    }
  },

  async delete(db: SQLiteDatabase, address: Address): Promise<void> {
    const stmt = await db.prepareAsync(`
      DELETE FROM addresses
      WHERE address = $address
    `);
    try {
      await stmt.executeAsync({ $address: address.toLowerCase() });
    } finally {
      await stmt.finalizeAsync();
    }
  }
};
