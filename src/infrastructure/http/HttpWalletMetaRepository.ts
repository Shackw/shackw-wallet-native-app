import * as v from "valibot";

import { GetWalletSummaryResult, IWalletMetaRepository } from "@/application/ports/IWalletMetaRepository";

import { RestClient, shackwRestClient } from "../clients/restClient";
import { WalletApiMetaSchema } from "../parsers/HttpWalletMetaSchema";

export class HttpWalletMetaRepository implements IWalletMetaRepository {
  private baseUrl = "/meta";
  private client: RestClient;

  constructor() {
    this.client = shackwRestClient;
  }

  async get(): Promise<GetWalletSummaryResult> {
    const summary = await this.client.get(`${this.baseUrl}/summary`);
    const parsed = v.parse(WalletApiMetaSchema, summary);
    return parsed;
  }
}
