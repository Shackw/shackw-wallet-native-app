import { Address, Hex } from "viem";

import { SupportChain } from "@/configs/chain";

export type UserVersionRow = {
  user_version: number;
};

export type UserSettingRow = {
  id: 1;
  selected_chain: SupportChain;
  default_wallet: Address | null;
  updated_at: number;
  created_at: number;
};

export type UserSettingWithAddressNameRow = UserSettingRow & { name: string };

export type AddressRow = {
  address: Address;
  name: string;
  is_mine: 0 | 1;
  updated_at: number;
  created_at: number;
};

export type TransactionRow = {
  chain: SupportChain;
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
  chain: SupportChain;
  year: number;
  month: number;
  token_address: Address;
  created_by_address: Address;
  status: "completed" | "partial";
  last_updated_at: number;
};
