import * as v from "valibot";

import {
  IRemoteTransactionsGateway,
  SearchRemoteTransactionsQuery,
  SearchRemoteTransactionsResult
} from "@/application/ports/IRemoteTransactionsGateway";
import { SearchRemoteTransactionsResultSchema } from "@/shared/validations/schemas/HttpRemoteTransactionsResultSchema";

import { RestClient, shackwRestClient } from "../clients/restClient";

export class HttpRemoteTransactionsGateway implements IRemoteTransactionsGateway {
  private baseUrl = "/transactions";
  private client: RestClient;

  constructor() {
    this.client = shackwRestClient;
  }

  async search(query: SearchRemoteTransactionsQuery): Promise<SearchRemoteTransactionsResult> {
    const searched = await this.client.post(`${this.baseUrl}:search`, query);
    const parsed = v.parse(SearchRemoteTransactionsResultSchema, searched);
    return parsed;
  }
}
