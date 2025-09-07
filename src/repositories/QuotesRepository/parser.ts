import * as v from "valibot";

import { addressValidator, hex32Validator } from "@/validations/rules/addressValidator";
import { feesPolicyValidator } from "@/validations/rules/feesPolicyValidator";
import { isoDateValidator } from "@/validations/rules/isoDateValidator";
import { tokenMetaValidator } from "@/validations/rules/tokenMetaValidator";
import { unsignedBigintFromStringValidator } from "@/validations/rules/unsignedBigintFromStringValidator";

export const CreateQuoteResponceSchema = v.object(
  {
    quoteToken: v.string("quoteToken must be a string."),
    expiresAt: isoDateValidator("expiresAt"),
    chainId: v.number("chainId must be a number."),
    sender: addressValidator("sender"),
    recipient: addressValidator("recipient"),
    token: tokenMetaValidator("token"),
    feeToken: tokenMetaValidator("feeToken"),
    amount: v.object({
      minUnits: unsignedBigintFromStringValidator("amount.minUnits"),
      decimals: v.number("decimals must be a number.")
    }),
    fee: v.object({
      minUnits: unsignedBigintFromStringValidator("fee.minUnits"),
      decimals: v.number("decimals must be a number.")
    }),
    delegate: addressValidator("delegate"),
    sponsor: addressValidator("sponsor"),
    callHash: hex32Validator("callHash"),
    policy: feesPolicyValidator,
    serverTime: isoDateValidator("serverTime")
  },
  issue => `${String(issue.expected)} is required`
);
