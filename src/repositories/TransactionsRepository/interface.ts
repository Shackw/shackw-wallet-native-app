import { Address, Hex } from "viem";

import { Token } from "@/registries/TokenRegistry";

export type SearchRpcTransactionPayload = {
  wallet: Address;
  tokens: { symbol: Token }[];
  timeFrom?: Date;
  timeTo?: Date;
  limit?: number;
  chunkSize?: bigint;
  direction?: "in" | "out" | "both";
};

export type RpcTransactionModel = {
  txHash: Hex;
  blockNumber: bigint;
  logIndex: number;
  token: Address;
  from: Address;
  to: Address;
  value: bigint;
  timestamp: number;
};
