import * as v from "valibot";

import { shackwRestClient, RestClient } from "@/infrastructure/clients/restClient";

import { TransferTokenResultSchema } from "../parsers/HttpTokenResultSchema";

import type {
  ITokensRepository,
  TransferTokenQuery,
  TransferTokenResult
} from "../../application/ports/ITokensRepository";

export class HttpTokensRepository implements ITokensRepository {
  private baseUrl = "/tokens";
  private client: RestClient;

  constructor() {
    this.client = shackwRestClient;
  }

  async transfer(query: TransferTokenQuery): Promise<TransferTokenResult> {
    const transfered = await this.client.post(`${this.baseUrl}:transfer`, query);
    const parsed = v.parse(TransferTokenResultSchema, transfered);
    return parsed;
  }
}
