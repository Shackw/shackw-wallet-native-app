import * as v from "valibot";

import { addressValidator, hex32Validator } from "@/validations/rules/addressValidator";
import { feesPolicyValidator } from "@/validations/rules/feesPolicyValidator";
import { isoDateValidator } from "@/validations/rules/isoDateValidator";
import { unsignedBigintFromStringValidator } from "@/validations/rules/unsignedBigintFromStringValidator";
import { tokenMetaValidator } from "@/validations/rules/tokenMetaValidator";

export const CreateQuoteResponceSchema = v.object({
  quoteToken: v.string(),
  expiresAt: isoDateValidator("expiresAt"),
  chainId: v.number(),
  sender: addressValidator("sender"),
  recipient: addressValidator("recipient"),
  token: tokenMetaValidator,
  feeToken: tokenMetaValidator,
  amount: v.object({
    minUnits: unsignedBigintFromStringValidator,
    decimals: v.number()
  }),
  fee: v.object({
    minUnits: unsignedBigintFromStringValidator,
    decimals: v.number()
  }),
  delegate: addressValidator("delegate"),
  sponsor: addressValidator("sponsor"),
  callHash: hex32Validator("callHash"),
  policy: feesPolicyValidator,
  serverTime: isoDateValidator("serverTime")
});
