import * as v from "valibot";

import { hinomaruRestClient } from "@/clients/restClient";
import { FeeModel } from "@/models/fee";

import { EstimateFeePayload } from "./dto";
import { responceToFeeModel } from "./mapper";
import { EstimateFeeResponseSchema } from "./parser";

export const FeeRepository = {
  async estimate(payload: EstimateFeePayload): Promise<FeeModel> {
    const estimated = await hinomaruRestClient.post("/fees:estimate", { json: payload });
    const parsed = v.parse(EstimateFeeResponseSchema, estimated);
    return responceToFeeModel(parsed);
  }
};
