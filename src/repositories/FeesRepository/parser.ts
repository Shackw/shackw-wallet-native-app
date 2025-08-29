import * as v from "valibot";

import { feesPolicyValidator } from "@/validations/rules/feesPolicyValidator";
import { strToBigintValidator } from "@/validations/rules/strToBigintValidator";
import { tokenMetaValidator } from "@/validations/rules/tokenMetaValidator";

export const EstimateFeeResponseSchema = v.object({
  token: tokenMetaValidator,
  feeToken: tokenMetaValidator,
  feeMinUnits: strToBigintValidator,
  feeDecimals: v.number(),
  policy: feesPolicyValidator
});
