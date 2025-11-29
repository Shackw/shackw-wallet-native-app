import * as v from "valibot";

import { RestClient } from "@/infrastructure/clients/restClient";

import { CreateQuoteResultSchema } from "../../shared/validations/schemas/HttpQuoteResultSchema";

import type { CreateQuoteQuery, CreateQuoteResult, IQuotesGateway } from "../../application/ports/IQuotesGateway";

export class HttpQuotesGateway implements IQuotesGateway {
  private path = "/quotes";
  private client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }

  async create(query: CreateQuoteQuery): Promise<CreateQuoteResult> {
    const created = await this.client.post(this.path, query);
    const parsed = v.parse(CreateQuoteResultSchema, created);
    return parsed;
  }
}
