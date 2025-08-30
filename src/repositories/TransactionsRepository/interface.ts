import { Address } from "viem";

import { Token } from "@/registries/TokenRegistry";

export type SearchTransactionPayload = {
  wallet: Address;
  tokens: { symbol: Token }[];
  timeFrom?: Date;
  timeTo?: Date;
  limit?: number;
  chunkSize?: bigint;
  direction?: "in" | "out" | "both";
};
