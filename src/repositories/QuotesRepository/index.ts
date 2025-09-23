import * as v from "valibot";

import { hinomaruRestClient } from "@/clients/restClient";

import { CreateQuoteResultSchema } from "./parser";

import type { CreateQuoteQuery, CreateQuoteResult, IQuotesRepository } from "./interface";

export const QuotesRepository: IQuotesRepository = {
  async create(query: CreateQuoteQuery): Promise<CreateQuoteResult> {
    const created = await hinomaruRestClient.post("/quotes", query);
    const parsed = v.parse(CreateQuoteResultSchema, created);
    return parsed;
  }
};
