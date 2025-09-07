import * as v from "valibot";

import { feesPolicyValidator } from "@/validations/rules/feesPolicyValidator";
import { tokenMetaValidator } from "@/validations/rules/tokenMetaValidator";
import { unsignedBigintFromStringValidator } from "@/validations/rules/unsignedBigintFromStringValidator";

export const EstimateFeeResponseSchema = v.object(
  {
    token: tokenMetaValidator("token"),
    feeToken: tokenMetaValidator("feeToken"),
    feeMinUnits: unsignedBigintFromStringValidator("feeMinUnits"),
    feeDecimals: v.number("feeDecimals must be a number."),
    policy: feesPolicyValidator
  },
  issue => `${String(issue.expected)} is required`
);
