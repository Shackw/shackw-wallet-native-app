import * as v from "valibot";

import type { IQuotesGateway, CreateQuoteQuery, CreateQuoteResult } from "@/application/ports/IQuotesGateway";
import type { HttpClient } from "@/infrastructure/clients/HttpClient";
import { CreateQuoteResultSchema } from "@/shared/validations/schemas/HttpQuoteResultSchema";

export class HttpQuotesGateway implements IQuotesGateway {
  private path = "/quotes";
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  async create(query: CreateQuoteQuery): Promise<CreateQuoteResult> {
    const created = await this.client.post(this.path, query);
    const parsed = v.parse(CreateQuoteResultSchema, created);
    return parsed;
  }
}
