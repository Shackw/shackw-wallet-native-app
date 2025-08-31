import * as v from "valibot";

import { TOKENS } from "@/registries/TokenRegistry";

import { addressValidator } from "./addressValidator";

export const tokenMetaValidator = v.object({
  symbol: v.pipe(v.string(), v.picklist(TOKENS)),
  address: addressValidator(),
  decimals: v.number()
});
