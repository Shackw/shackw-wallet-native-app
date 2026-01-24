import * as v from "valibot";

import type { ITokensGateway, TransferTokenQuery, TransferTokenResult } from "@/application/ports/ITokensGateway";
import type { HttpClient } from "@/infrastructure/clients/HttpClient";
import { TransferTokenResultSchema } from "@/shared/validations/schemas/HttpTokenResultSchema";

export class HttpTokensGateway implements ITokensGateway {
  private path = "/tokens";
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  async transfer(query: TransferTokenQuery): Promise<TransferTokenResult> {
    const transfered = await this.client.post(`${this.path}:transfer`, query);
    const parsed = v.parse(TransferTokenResultSchema, transfered);
    return parsed;
  }
}
