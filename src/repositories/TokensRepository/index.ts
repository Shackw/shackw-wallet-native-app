import * as v from "valibot";

import { hinomaruRestClient } from "@/clients/restClient";

import { TransferTokenResultSchema } from "./parser";

import type { ITokensRepository, TransferTokenQuery, TransferTokenResult } from "./interface";

export const TokensRepository: ITokensRepository = {
  async transfer(query: TransferTokenQuery): Promise<TransferTokenResult> {
    const transfered = await hinomaruRestClient.post("/tokens:transfer", query);
    const parsed = v.parse(TransferTokenResultSchema, transfered);
    return parsed;
  }
};
