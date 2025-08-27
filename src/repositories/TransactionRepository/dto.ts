import { Address } from "viem";

import { TokenKind } from "@/configs/token";

export type SearchTransactionPayload = {
  wallet: Address;
  tokens: { symbol: TokenKind }[];
  timeFrom?: Date;
  timeTo?: Date;
  limit?: number;
  chunkSize?: bigint;
  direction?: "in" | "out" | "both";
};
