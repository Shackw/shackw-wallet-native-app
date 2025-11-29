import * as v from "valibot";

import {
  IRemoteTransactionsGateway,
  SearchRemoteTransactionsQuery,
  SearchRemoteTransactionsResult
} from "@/application/ports/IRemoteTransactionsGateway";
import { SearchRemoteTransactionsResultSchema } from "@/shared/validations/schemas/HttpRemoteTransactionsResultSchema";

import { RestClient } from "../clients/restClient";

export class HttpRemoteTransactionsGateway implements IRemoteTransactionsGateway {
  private path = "/transactions";
  private client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }

  async search(query: SearchRemoteTransactionsQuery): Promise<SearchRemoteTransactionsResult> {
    const searched = await this.client.post(`${this.path}:search`, query);
    const parsed = v.parse(SearchRemoteTransactionsResultSchema, searched);
    return parsed;
  }
}
