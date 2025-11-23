import { SQLiteDatabase } from "expo-sqlite";
import { Address, Hex } from "viem";

import { Chain } from "@/config/chain";
import { Token } from "@/registries/ChainTokenRegistry";

export interface ITransactionsRepository {
  search(db: SQLiteDatabase, query: SearchTransactionQuery): Promise<ResolvedTransactionResult[]>;
  getProgress(db: SQLiteDatabase, query: GetTransactionProgressQuery): Promise<TransactionProgressResult | null>;
}

export interface IRemoteTransactionsRepository {
  search(query: SearchTransactionQuery): Promise<TransactionResult[]>;
}

export interface ILocalTransactionsRepository {
  search(db: SQLiteDatabase, query: SearchTransactionQuery): Promise<ResolvedTransactionResult[]>;
  batchWrite(db: SQLiteDatabase, progress: TransactionProgressResult, rows: TransactionResult[]): Promise<void>;
  getProgress(db: SQLiteDatabase, query: GetTransactionProgressQuery): Promise<TransactionProgressResult | null>;
}

export type TransactionResult = {
  txHash: Hex;
  blockNumber: bigint;
  logIndex: number;
  tokenAddress: Address;
  fromAddress: Address;
  toAddress: Address;
  valueMinUnits: bigint;
  transferredUnixAt: number;
};

export type ResolvedTransactionResult = TransactionResult & {
  fromName?: string;
  toName?: string;
};

export type TransactionProgressResult = {
  chain: Chain;
  year: number;
  month: number;
  token: Token;
  createdBy: Address;
  status: "completed" | "partial";
  lastUpdatedAt: Date;
};

export type SearchTransactionQuery = {
  chain: Chain;
  wallet: Address;
  tokens: { symbol: Token }[];
  timeFrom: Date;
  timeTo: Date;
  limit?: number;
  direction: "in" | "out" | "both";
};

export type GetTransactionProgressQuery = {
  chain: Chain;
  wallet: Address;
  year: number;
  month: number;
  token: { symbol: Token };
};
