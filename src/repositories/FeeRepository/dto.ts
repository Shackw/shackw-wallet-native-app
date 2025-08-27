import * as v from "valibot";

import { TokenKind } from "@/configs/token";

import { EstimateFeeResponseSchema } from "./parser";

export type EstimateFeePayload = {
  chainId: number;
  amountMinUnits: bigint;
  token: { symbol: TokenKind };
  feeToken: { symbol: TokenKind };
};

export type EstimateFeeResponce = v.InferOutput<typeof EstimateFeeResponseSchema>;
