import * as v from "valibot";

import { feesPolicyValidator } from "@/validations/rules/feesPolicyValidator";
import { unsignedBigintFromStringValidator } from "@/validations/rules/unsignedBigintFromStringValidator";
import { tokenMetaValidator } from "@/validations/rules/tokenMetaValidator";

export const EstimateFeeResponseSchema = v.object({
  token: tokenMetaValidator,
  feeToken: tokenMetaValidator,
  feeMinUnits: unsignedBigintFromStringValidator,
  feeDecimals: v.number(),
  policy: feesPolicyValidator
});
