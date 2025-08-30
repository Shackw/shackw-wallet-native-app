import * as v from "valibot";
import { Address } from "viem";

import { Token } from "@/registries/TokenRegistry";

import { CreateQuoteResponceSchema } from "./parser";

export type CreateQuotePayload = {
  chainId: number;
  sender: Address;
  recipient: Address;
  token: { symbol: Token };
  amountMinUnits: bigint;
};

export type CreateQuoteResponce = v.InferOutput<typeof CreateQuoteResponceSchema>;
