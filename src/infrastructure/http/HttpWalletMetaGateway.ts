import * as v from "valibot";

import { GetWalletSummaryResult, IWalletMetaGateway } from "@/application/ports/IWalletMetaGateway";
import { WalletApiMetaSchema } from "@/shared/validations/schemas/HttpWalletMetaSchema";

import { RestClient, shackwRestClient } from "../clients/restClient";

export class HttpWalletMetaGateway implements IWalletMetaGateway {
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
