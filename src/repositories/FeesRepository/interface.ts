import * as v from "valibot";

import { SupportChain } from "@/configs/chain";
import { Token } from "@/registries/TokenRegistry";

import { EstimateFeeResultSchema } from "./parser";

export interface IFeesRepository {
  estimate(query: EstimateFeeQuery): Promise<EstimateFeeResult>;
}

export type EstimateFeeResult = v.InferOutput<typeof EstimateFeeResultSchema>;

export type EstimateFeeQuery = {
  chain: SupportChain;
  amountMinUnits: bigint;
  token: { symbol: Token };
  feeToken: { symbol: Token };
};
