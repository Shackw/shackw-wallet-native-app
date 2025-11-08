import * as v from "valibot";

import { TOKENS } from "@/registries/TokenRegistry";

import { bigintStringValidator } from "./stringBigintValidator";

export const amountUnitValidator = (field: string) =>
  v.object(
    {
      symbol: v.picklist(TOKENS, `${field}.symbol must be one of: ${TOKENS.join(", ")}`),
      minUnits: bigintStringValidator(`${field}.minUnits`),
      decimals: v.number(`${field}.decimals must be a number.`)
    },
    issue => `${String(issue.expected)} is required`
  );
