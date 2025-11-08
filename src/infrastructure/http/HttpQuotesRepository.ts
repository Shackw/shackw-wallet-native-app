import * as v from "valibot";

import { hinomaruRestClient } from "@/infrastructure/clients/restClient";

import { CreateQuoteResultSchema } from "../parsers/CreateQuoteResultSchema";

import type { CreateQuoteQuery, CreateQuoteResult, IQuotesRepository } from "../../application/ports/IQuotesRepository";

export const HttpQuotesRepository: IQuotesRepository = {
  async create(query: CreateQuoteQuery): Promise<CreateQuoteResult> {
    const created = await hinomaruRestClient.post("/quotes", query);
    const parsed = v.parse(CreateQuoteResultSchema, created);
    return parsed;
  }
};
