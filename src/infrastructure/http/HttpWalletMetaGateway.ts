import * as v from "valibot";

import { GetWalletSummaryResult, IWalletMetaGateway } from "@/application/ports/IWalletMetaGateway";
import { WalletApiMetaSchema } from "@/shared/validations/schemas/HttpWalletMetaSchema";

import { RestClient } from "../clients/restClient";

export class HttpWalletMetaGateway implements IWalletMetaGateway {
  private path = "/meta";
  private client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }

  async get(): Promise<GetWalletSummaryResult> {
    const summary = await this.client.get(`${this.path}/summary`);
    const parsed = v.parse(WalletApiMetaSchema, summary);
    return parsed;
  }
}
