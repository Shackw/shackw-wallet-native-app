import * as v from "valibot";

import { hinomaruRestClient, RestClient } from "@/infrastructure/clients/restClient";

import { CreateQuoteResultSchema } from "../parsers/HttpQuoteResultSchema";

import type { CreateQuoteQuery, CreateQuoteResult, IQuotesRepository } from "../../application/ports/IQuotesRepository";

export class HttpQuotesRepository implements IQuotesRepository {
  private baseUrl = "/quotes";
  private client: RestClient;

  constructor() {
    this.client = hinomaruRestClient;
  }

  async create(query: CreateQuoteQuery): Promise<CreateQuoteResult> {
    const created = await this.client.post(this.baseUrl, query);
    const parsed = v.parse(CreateQuoteResultSchema, created);
    return parsed;
  }
}
