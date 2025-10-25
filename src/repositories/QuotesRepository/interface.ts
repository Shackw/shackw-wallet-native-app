import * as v from "valibot";
import { Address } from "viem";

import { SupportChain } from "@/configs/chain";
import { Token } from "@/registries/TokenRegistry";

import { CreateQuoteResultSchema } from "./parser";

export interface IQuotesRepository {
  create(query: CreateQuoteQuery): Promise<CreateQuoteResult>;
}

export type CreateQuoteResult = v.InferOutput<typeof CreateQuoteResultSchema>;

export type CreateQuoteQuery = {
  chain: SupportChain;
  sender: Address;
  recipient: Address;
  token: { symbol: Token };
  feeToken: { symbol: Token };
  amountMinUnits: bigint;
};
