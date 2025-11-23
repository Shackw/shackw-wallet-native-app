import * as v from "valibot";
import { Address } from "viem";

import { Chain } from "@/config/chain";
import { Token } from "@/registries/ChainTokenRegistry";
import { CreateQuoteResultSchema } from "@/shared/validations/schemas/HttpQuoteResultSchema";

export interface IQuotesGateway {
  create(query: CreateQuoteQuery): Promise<CreateQuoteResult>;
}

export type CreateQuoteResult = v.InferOutput<typeof CreateQuoteResultSchema>;

export type CreateQuoteQuery = {
  chain: Chain;
  sender: Address;
  recipient: Address;
  token: { symbol: Token };
  feeToken: { symbol: Token };
  amountMinUnits: bigint;
};
