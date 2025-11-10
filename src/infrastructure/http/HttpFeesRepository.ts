import * as v from "valibot";

import { hinomaruRestClient, RestClient } from "@/infrastructure/clients/restClient";

import { EstimateFeeResultSchema } from "../parsers/HttpFeeResultSchema";

import type { EstimateFeeQuery, EstimateFeeResult, IFeesRepository } from "../../application/ports/IFeesRepository";

export class HttpFeesRepository implements IFeesRepository {
  private baseUrl = "/fees";
  private client: RestClient;

  constructor() {
    this.client = hinomaruRestClient;
  }

  async estimate(query: EstimateFeeQuery): Promise<EstimateFeeResult> {
    const estimated = await this.client.post(`${this.baseUrl}:estimate`, query);
    const parsed = v.parse(EstimateFeeResultSchema, estimated);
    return parsed;
  }
}
