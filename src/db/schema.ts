import { Address, Hex } from "viem";

export type UserVersionRow = {
  user_version: number;
};

export type AddressRow = {
  address: Address;
  name: string;
  is_mine: 0 | 1;
  updated_at: number;
  created_at: number;
};

export type TransactionRow = {
  tx_hash: Hex;
  log_index: number;
  block_number: string;
  token_address: Address;
  from_address: Address;
  to_address: Address;
  value_min_units: string;
  transferred_at: number;
  inserted_at: number;
};

export type TransactionWithAddressRow = TransactionRow & { from_name: string | null; to_name: string | null };

export type TransactionProgressRow = {
  year: number;
  month: number;
  token_address: Address;
  status: "completed" | "partial";
  last_updated_at: number;
};
