import { SQLiteDatabase } from "expo-sqlite";
import { Address } from "viem";

export interface IAddressesRepository {
  get(db: SQLiteDatabase, address: Address): Promise<AddressesResult | null>;
  list(db: SQLiteDatabase): Promise<AddressesResult[]>;
  create(db: SQLiteDatabase, query: CreateAddressQuery): Promise<void>;
  update(db: SQLiteDatabase, query: UpdateAddressQuery): Promise<void>;
  delete(db: SQLiteDatabase, address: Address): Promise<void>;
}

export type AddressesResult = {
  address: Address;
  name: string;
  isMine: boolean;
  updatedAt: Date;
  createdAt: Date;
};

export type CreateAddressQuery = Pick<AddressesResult, "address" | "name" | "isMine">;

export type UpdateAddressQuery = Pick<AddressesResult, "address" | "name">;
