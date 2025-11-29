import * as v from "valibot";

import { ITokensGateway, TransferTokenQuery, TransferTokenResult } from "@/application/ports/ITokensGateway";
import { RestClient } from "@/infrastructure/clients/restClient";
import { TransferTokenResultSchema } from "@/shared/validations/schemas/HttpTokenResultSchema";

export class HttpTokensGateway implements ITokensGateway {
  private path = "/tokens";
  private client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }

  async transfer(query: TransferTokenQuery): Promise<TransferTokenResult> {
    const transfered = await this.client.post(`${this.path}:transfer`, query);
    const parsed = v.parse(TransferTokenResultSchema, transfered);
    return parsed;
  }
}
