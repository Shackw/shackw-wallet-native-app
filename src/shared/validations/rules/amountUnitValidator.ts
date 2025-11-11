import * as v from "valibot";

import { TOKENS } from "@/registries/TokenRegistry";

import { stringBigintValidator } from "./stringBigintValidator";

export const amountUnitValidator = (field: string) =>
  v.object(
    {
      symbol: v.picklist(TOKENS, `${field}.symbol must be one of: ${TOKENS.join(", ")}`),
      minUnits: stringBigintValidator(`${field}.minUnits`),
      decimals: v.number(`${field}.decimals must be a number.`)
    },
    issue => `${String(issue.expected)} is required`
  );
