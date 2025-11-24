import * as v from "valibot";

import { WalletApiMetaSchema } from "@/shared/validations/schemas/HttpWalletMetaSchema";

export interface IWalletMetaGateway {
  get(): Promise<GetWalletSummaryResult>;
}

export type GetWalletSummaryResult = v.InferOutput<typeof WalletApiMetaSchema>;
