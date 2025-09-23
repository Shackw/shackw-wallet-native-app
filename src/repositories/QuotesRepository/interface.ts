import * as v from "valibot";
import { Address } from "viem";

import { Token } from "@/registries/TokenRegistry";

import { CreateQuoteResultSchema } from "./parser";

export interface IQuotesRepository {
  create(query: CreateQuoteQuery): Promise<CreateQuoteResult>;
}

export type CreateQuoteResult = v.InferOutput<typeof CreateQuoteResultSchema>;

export type CreateQuoteQuery = {
  chainId: number;
  sender: Address;
  recipient: Address;
  token: { symbol: Token };
  feeToken: { symbol: Token };
  amountMinUnits: bigint;
};
