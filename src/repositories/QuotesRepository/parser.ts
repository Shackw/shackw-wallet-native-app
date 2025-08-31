import * as v from "valibot";

import { addressValidator } from "@/validations/rules/addressValidator";
import { feesPolicyValidator } from "@/validations/rules/feesPolicyValidator";
import { isoDateValidator } from "@/validations/rules/isoDateValidator";
import { strToBigintValidator } from "@/validations/rules/strToBigintValidator";
import { tokenMetaValidator } from "@/validations/rules/tokenMetaValidator";

export const CreateQuoteResponceSchema = v.object({
  quoteToken: v.string(),
  expiresAt: isoDateValidator,
  chainId: v.number(),
  sender: addressValidator("Invalid address: sender"),
  recipient: addressValidator("Invalid address: recipient"),
  token: tokenMetaValidator,
  feeToken: tokenMetaValidator,
  amount: v.object({
    minUnits: strToBigintValidator,
    decimals: v.number()
  }),
  fee: v.object({
    minUnits: strToBigintValidator,
    decimals: v.number()
  }),
  delegate: addressValidator("Invalid address: delegate"),
  sponsor: addressValidator("Invalid address: sponsor"),
  callHash: addressValidator("Invalid address"),
  policy: feesPolicyValidator,
  serverTime: isoDateValidator
});
