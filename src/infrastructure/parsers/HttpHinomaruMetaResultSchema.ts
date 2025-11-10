import * as v from "valibot";

import { addressValidator } from "@/shared/validations/rules/addressValidator";

export const GetHinomaruTokensMetaResultSchema = v.tuple([
  v.object({
    symbol: v.literal("JPYC"),
    address: v.object({ main: addressValidator("recipient"), polygon: addressValidator("recipient") })
  }),
  v.object({}),
  v.object({}),
  v.object({})
]);
