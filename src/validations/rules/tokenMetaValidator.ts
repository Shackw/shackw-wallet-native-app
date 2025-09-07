import * as v from "valibot";

import { TOKENS } from "@/registries/TokenRegistry";

import { addressValidator } from "./addressValidator";

export const tokenMetaValidator = (field: string) =>
  v.object(
    {
      symbol: v.pipe(
        v.string(`${field}.symbol must be a string.`),
        v.picklist(TOKENS, `${field}.symbol must be one of: ${TOKENS.join(", ")}`)
      ),
      address: addressValidator(`${field}.address`),
      decimals: v.number(`${field}.decimals must be a number.`)
    },
    issue => `${String(issue.expected)} is required`
  );
