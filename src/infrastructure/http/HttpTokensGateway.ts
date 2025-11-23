import * as v from "valibot";

import { ITokensGateway, TransferTokenQuery, TransferTokenResult } from "@/application/ports/ITokensGateway";
import { shackwRestClient, RestClient } from "@/infrastructure/clients/restClient";
import { TransferTokenResultSchema } from "@/shared/validations/schemas/HttpTokenResultSchema";

export class HttpTokensGateway implements ITokensGateway {
  private baseUrl = "/transfers";
  private client: RestClient;

  constructor() {
    this.client = shackwRestClient;
  }

  async transfer(query: TransferTokenQuery): Promise<TransferTokenResult> {
    const transfered = await this.client.post(this.baseUrl, query);
    const parsed = v.parse(TransferTokenResultSchema, transfered);
    return parsed;
  }
}
