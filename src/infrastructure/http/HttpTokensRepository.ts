import * as v from "valibot";

import { hinomaruRestClient } from "@/infrastructure/clients/restClient";

import { TransferTokenResultSchema } from "../parsers/TransferTokenResultSchema";

import type {
  ITokensRepository,
  TransferTokenQuery,
  TransferTokenResult
} from "../../application/ports/ITokensRepository";

export const HttpTokensRepository: ITokensRepository = {
  async transfer(query: TransferTokenQuery): Promise<TransferTokenResult> {
    const transfered = await hinomaruRestClient.post("/tokens:transfer", query);
    const parsed = v.parse(TransferTokenResultSchema, transfered);
    return parsed;
  }
};
