import * as v from "valibot";

import { hinomaruRestClient } from "@/clients/restClient";

import { EstimateFeeResultSchema } from "./parser";

import type { EstimateFeeQuery, EstimateFeeResult, IFeesRepository } from "./interface";

export const FeesRepository: IFeesRepository = {
  async estimate(query: EstimateFeeQuery): Promise<EstimateFeeResult> {
    const estimated = await hinomaruRestClient.post("/fees:estimate", query);
    const parsed = v.parse(EstimateFeeResultSchema, estimated);
    return parsed;
  }
};
