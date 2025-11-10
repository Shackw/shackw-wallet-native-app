import * as v from "valibot";

import { amountUnitValidator } from "@/shared/validations/rules/amountUnitValidator";
import { feesPolicyValidator } from "@/shared/validations/rules/feesPolicyValidator";
import { tokenMetaValidator } from "@/shared/validations/rules/tokenMetaValidator";

export const EstimateFeeResultSchema = v.object(
  {
    token: tokenMetaValidator("token"),
    feeToken: tokenMetaValidator("feeToken"),
    amount: amountUnitValidator("amount"),
    fee: amountUnitValidator("fee"),
    policy: feesPolicyValidator
  },
  issue => `${String(issue.expected)} is required`
);
