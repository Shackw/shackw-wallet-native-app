import * as v from "valibot";

import { addressValidator } from "@/shared/validations/rules/addressValidator";

export const TokensMetaSchema = v.tuple([
  v.object({
    symbol: v.literal("JPYC"),
    address: v.object({
      main: addressValidator("recipient"),
      polygon: addressValidator("recipient")
    }),
    decimals: v.literal(18)
  }),
  v.object({
    symbol: v.literal("USDC"),
    address: v.object({
      main: addressValidator("recipient"),
      base: addressValidator("recipient"),
      polygon: addressValidator("recipient")
    }),
    decimals: v.literal(6)
  }),
  v.object({
    symbol: v.literal("EURC"),
    address: v.object({
      main: addressValidator("recipient"),
      base: addressValidator("recipient")
    }),
    decimals: v.literal(6)
  })
]);
