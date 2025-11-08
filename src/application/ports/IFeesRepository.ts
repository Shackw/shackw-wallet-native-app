import * as v from "valibot";

import { SupportChain } from "@/config/chain";
import { Token } from "@/registries/TokenRegistry";

import { EstimateFeeResultSchema } from "../../infrastructure/parsers/EstimateFeeResultSchema";

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
