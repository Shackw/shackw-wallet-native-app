import * as v from "valibot";

import { WalletApiMetaSchema } from "@/infrastructure/parsers/HttpWalletMetaSchema";

export interface IWalletMetaRepository {
  get(): Promise<GetWalletSummaryResult>;
}

export type GetWalletSummaryResult = v.InferOutput<typeof WalletApiMetaSchema>;
