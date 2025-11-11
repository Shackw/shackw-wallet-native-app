import * as v from "valibot";

import { amountUnitValidator } from "./amountUnitValidator";
import { stringBigintValidator } from "./stringBigintValidator";

export const feesPolicyValidator = v.object(
  {
    method: v.string("policy.method must be a string."),
    version: v.string("policy.version must be a string."),
    bps: stringBigintValidator("policy.bps"),
    cap: amountUnitValidator("policy.cap"),
    quantumUnits: stringBigintValidator("policy.quantumUnits")
  },
  issue => `${String(issue.expected)} is required`
);
