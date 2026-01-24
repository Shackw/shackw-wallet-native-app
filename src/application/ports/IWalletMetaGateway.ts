import type { WalletApiMetaSchema } from "@/shared/validations/schemas/HttpWalletMetaSchema";

import type * as v from "valibot";

export interface IWalletMetaGateway {
  get(): Promise<GetWalletSummaryResult>;
}

export type GetWalletSummaryResult = v.InferOutput<typeof WalletApiMetaSchema>;
