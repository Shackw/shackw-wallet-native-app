import * as v from "valibot";

import { addressValidator } from "@/validations/rules/addressValidator";
import { isoDateValidator } from "@/validations/rules/isoDateValidator";

export const TransferTokenResponceSchema = v.object({
  quoteId: v.pipe(
    v.string(),
    v.startsWith("tq_"),
    v.transform(s => s as `tq_${string}`)
  ),
  opId: addressValidator("opId"),
  txHash: addressValidator("txHash"),
  chainId: v.number(),
  status: v.union([v.literal("submitted"), v.literal("alreadyExecuted")]),
  serverTime: isoDateValidator("serverTime")
});
