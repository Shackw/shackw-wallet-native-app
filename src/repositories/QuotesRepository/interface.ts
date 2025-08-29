import * as v from "valibot";
import { Address } from "viem";

import { TokenKind } from "@/configs/token";

import { CreateQuoteResponceSchema } from "./parser";

export type CreateQuotePayload = {
  chainId: number;
  sender: Address;
  recipient: Address;
  token: { symbol: TokenKind };
  amountMinUnits: bigint;
};

export type CreateQuoteResponce = v.InferOutput<typeof CreateQuoteResponceSchema>;
