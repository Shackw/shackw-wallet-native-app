import * as v from "valibot";

import { GetWalletSummaryResult, IWalletMetaGateway } from "@/application/ports/IWalletMetaGateway";
import { WalletApiMetaSchema } from "@/shared/validations/schemas/HttpWalletMetaSchema";

import { HttpClient } from "../clients/HttpClient";

export class HttpWalletMetaGateway implements IWalletMetaGateway {
  private path = "/meta";
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  async get(): Promise<GetWalletSummaryResult> {
    const summary = await this.client.get(`${this.path}/summary`);
    const parsed = v.parse(WalletApiMetaSchema, summary);
    return parsed;
  }
}
