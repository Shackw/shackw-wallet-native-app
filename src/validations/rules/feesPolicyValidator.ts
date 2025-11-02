import * as v from "valibot";

import { amountUnitValidator } from "./amountUnitValidator";
import { bigintStringValidator } from "./stringBigintValidator";

export const feesPolicyValidator = v.object(
  {
    method: v.string("policy.method must be a string."),
    version: v.string("policy.version must be a string."),
    bps: bigintStringValidator("policy.bps"),
    cap: amountUnitValidator("policy.cap"),
    quantumUnits: bigintStringValidator("policy.quantumUnits")
  },
  issue => `${String(issue.expected)} is required`
);
