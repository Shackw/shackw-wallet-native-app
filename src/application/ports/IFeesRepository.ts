import * as v from "valibot";

import { Chain } from "@/config/chain";
import { Token } from "@/registries/TokenRegistry";

import { EstimateFeeResultSchema } from "../../infrastructure/parsers/HttpFeeResultSchema";

export interface IFeesRepository {
  estimate(query: EstimateFeeQuery): Promise<EstimateFeeResult>;
}

export type EstimateFeeResult = v.InferOutput<typeof EstimateFeeResultSchema>;

export type EstimateFeeQuery = {
  chain: Chain;
  amountMinUnits: bigint;
  token: { symbol: Token };
  feeToken: { symbol: Token };
};
