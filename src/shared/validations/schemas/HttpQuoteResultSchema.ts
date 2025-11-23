import * as v from "valibot";

import { addressValidator, hex64Validator } from "@/shared/validations/rules/addressValidator";
import { amountUnitValidator } from "@/shared/validations/rules/amountUnitValidator";
import { feesPolicyValidator } from "@/shared/validations/rules/feesPolicyValidator";
import { isoDateValidator } from "@/shared/validations/rules/isoDateValidator";
import { tokenMetaValidator } from "@/shared/validations/rules/tokenMetaValidator";

export const CreateQuoteResultSchema = v.object(
  {
    quoteToken: v.string("quoteToken must be a string."),
    expiresAt: isoDateValidator("expiresAt"),
    chainId: v.number("chainId must be a number."),
    sender: addressValidator("sender"),
    recipient: addressValidator("recipient"),
    token: tokenMetaValidator("token"),
    feeToken: tokenMetaValidator("feeToken"),
    amount: amountUnitValidator("amount"),
    delegate: addressValidator("delegate"),
    sponsor: addressValidator("sponsor"),
    callHash: hex64Validator("callHash"),
    fee: amountUnitValidator("fee"),
    policy: feesPolicyValidator,
    serverTime: isoDateValidator("serverTime")
  },
  issue => `${String(issue.expected)} is required`
);
