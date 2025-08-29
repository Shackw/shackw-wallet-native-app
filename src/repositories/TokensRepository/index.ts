import * as v from "valibot";

import { hinomaruRestClient } from "@/clients/restClient";

import { TransferTokenResponceSchema } from "./parser";

import type { TransferTokenPayload, TransferTokenResponce } from "./dto";

export const TokensRepository = {
  async transfer(payload: TransferTokenPayload): Promise<TransferTokenResponce> {
    const transfered = await hinomaruRestClient.post("/token:transfer", { json: payload });
    const parsed = v.parse(TransferTokenResponceSchema, transfered);
    return parsed;
  }
};
