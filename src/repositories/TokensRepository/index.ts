import * as v from "valibot";

import { hinomaruRestClient } from "@/clients/restClient";

import { TransferTokenResponceSchema } from "./parser";

import type { TransferTokenPayload, TransferTokenResponce } from "./interface";

export const TokensRepository = {
  async transfer(payload: TransferTokenPayload): Promise<TransferTokenResponce> {
    const transfered = await hinomaruRestClient.post("/tokens:transfer", payload);
    const parsed = v.parse(TransferTokenResponceSchema, transfered);
    return parsed;
  }
};
