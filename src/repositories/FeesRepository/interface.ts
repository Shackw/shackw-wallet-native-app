import * as v from "valibot";

import { Token } from "@/registries/TokenRegistry";

import { EstimateFeeResponseSchema } from "./parser";

export type EstimateFeePayload = {
  chainId: number;
  amountMinUnits: bigint;
  token: { symbol: Token };
  feeToken: { symbol: Token };
};

export type EstimateFeeResponce = v.InferOutput<typeof EstimateFeeResponseSchema>;
