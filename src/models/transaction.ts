import type { Address, Hex } from "viem";

export type TransactionModel = {
  txHash: Hex;
  blockNumber: bigint;
  logIndex: number;
  token: Address;
  from: Address;
  to: Address;
  value: bigint;
  timestamp: number;
};

export type GetLastTransactionCommand = { wallet: Address };
