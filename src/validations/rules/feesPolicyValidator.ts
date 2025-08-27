import * as v from "valibot";

import { TOKENS } from "@/configs/token";

import { strToBigintValidator } from "./strToBigintValidator";

export const feesPolicyValidator = v.object({
  method: v.string(),
  version: v.string(),
  bps: v.number(),
  cap: v.object({
    minUnit: strToBigintValidator,
    currency: v.pipe(v.string(), v.picklist(TOKENS))
  })
});
