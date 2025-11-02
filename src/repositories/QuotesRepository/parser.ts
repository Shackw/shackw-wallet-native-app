import * as v from "valibot";

import { addressValidator, hex64Validator } from "@/validations/rules/addressValidator";
import { amountUnitValidator } from "@/validations/rules/amountUnitValidator";
import { feesPolicyValidator } from "@/validations/rules/feesPolicyValidator";
import { isoDateValidator } from "@/validations/rules/isoDateValidator";
import { tokenMetaValidator } from "@/validations/rules/tokenMetaValidator";

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
    fee: amountUnitValidator("fee"),
    delegate: addressValidator("delegate"),
    sponsor: addressValidator("sponsor"),
    callHash: hex64Validator("callHash"),
    policy: feesPolicyValidator,
    serverTime: isoDateValidator("serverTime")
  },
  issue => `${String(issue.expected)} is required`
);
