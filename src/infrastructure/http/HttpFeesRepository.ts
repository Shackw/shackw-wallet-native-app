import * as v from "valibot";

import { hinomaruRestClient } from "@/infrastructure/clients/restClient";

import { EstimateFeeResultSchema } from "../parsers/EstimateFeeResultSchema";

import type { EstimateFeeQuery, EstimateFeeResult, IFeesRepository } from "../../application/ports/IFeesRepository";

export const HttpFeesRepository: IFeesRepository = {
  async estimate(query: EstimateFeeQuery): Promise<EstimateFeeResult> {
    const estimated = await hinomaruRestClient.post("/fees:estimate", query);
    const parsed = v.parse(EstimateFeeResultSchema, estimated);
    return parsed;
  }
};
