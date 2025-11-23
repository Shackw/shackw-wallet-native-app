import { Token } from "@/registries/ChainTokenRegistry";

import type { Address, Hex } from "viem";

export type TransactionModel = {
  txHash: Hex;
  blockNumber: bigint;
  logIndex: number;
  token: Token;
  direction: "in" | "out" | "self";
  value: { minUnits: bigint; displyValue: number };
  counterparty: {
    address: Address;
    name?: string;
  };
  transferredAt: Date;
};

export type GetLastTransactionCommand = {
  wallet: Address;
};

export type ListTransactionsByTermCommand = {
  wallet: Address;
  token: Token;
  timeFrom: Date;
  timeTo: Date;
};
