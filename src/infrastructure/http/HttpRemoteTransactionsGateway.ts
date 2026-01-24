import * as v from "valibot";

import type {
  IRemoteTransactionsGateway,
  SearchRemoteTransactionsQuery,
  SearchRemoteTransactionsResult
} from "@/application/ports/IRemoteTransactionsGateway";
import { SearchRemoteTransactionsResultSchema } from "@/shared/validations/schemas/HttpRemoteTransactionsResultSchema";

import type { HttpClient } from "../clients/HttpClient";

export class HttpRemoteTransactionsGateway implements IRemoteTransactionsGateway {
  private path = "/transactions";
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  async search(query: SearchRemoteTransactionsQuery): Promise<SearchRemoteTransactionsResult> {
    const searched = await this.client.post(`${this.path}:search`, query);
    const parsed = v.parse(SearchRemoteTransactionsResultSchema, searched);
    return parsed;
  }
}
