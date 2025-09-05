import * as v from "valibot";

import { TOKENS } from "@/registries/TokenRegistry";

import { addressValidator } from "./addressValidator";

export const tokenMetaValidator = v.object({
  symbol: v.pipe(
    v.string("symbol must be a string."),
    v.picklist(TOKENS, `symbol must be one of: ${TOKENS.join(", ")}`)
  ),
  address: addressValidator("address"),
  decimals: v.number("symbol must be a decimals.")
});
