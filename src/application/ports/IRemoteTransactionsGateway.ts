import type { Chain } from "@/config/chain";
import type { Token } from "@/registries/ChainTokenRegistry";
import type { SearchRemoteTransactionsResultSchema } from "@/shared/validations/schemas/HttpRemoteTransactionsResultSchema";

import type * as v from "valibot";
import type { Address } from "viem";

export interface IRemoteTransactionsGateway {
  search(query: SearchRemoteTransactionsQuery): Promise<SearchRemoteTransactionsResult>;
}

export type SearchRemoteTransactionItem = SearchRemoteTransactionsResult["items"][number];

export type SearchRemoteTransactionsResult = v.InferOutput<typeof SearchRemoteTransactionsResultSchema>;

export type SearchRemoteTransactionsDirection = "in" | "out" | "both";

export type SearchRemoteTransactionsQuery = {
  chain: Chain;
  tokens: { symbol: Token }[];
  wallet: Address;
  timestampGte: number;
  timestampLte: number;
  direction: SearchRemoteTransactionsDirection;
  limit?: number;
};
