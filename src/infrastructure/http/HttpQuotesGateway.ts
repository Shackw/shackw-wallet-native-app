import * as v from "valibot";

import { shackwRestClient, RestClient } from "@/infrastructure/clients/restClient";

import { CreateQuoteResultSchema } from "../../shared/validations/schemas/HttpQuoteResultSchema";

import type { CreateQuoteQuery, CreateQuoteResult, IQuotesGateway } from "../../application/ports/IQuotesGateway";

export class HttpQuotesGateway implements IQuotesGateway {
  private baseUrl = "/quotes";
  private client: RestClient;

  constructor() {
    this.client = shackwRestClient;
  }

  async create(query: CreateQuoteQuery): Promise<CreateQuoteResult> {
    const created = await this.client.post(this.baseUrl, query);
    const parsed = v.parse(CreateQuoteResultSchema, created);
    return parsed;
  }
}
