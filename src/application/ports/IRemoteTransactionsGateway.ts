import * as v from "valibot";
import { Address } from "viem";

import { Chain } from "@/config/chain";
import { Token } from "@/registries/ChainTokenRegistry";
import { SearchRemoteTransactionsResultSchema } from "@/shared/validations/schemas/HttpRemoteTransactionsResultSchema";

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
