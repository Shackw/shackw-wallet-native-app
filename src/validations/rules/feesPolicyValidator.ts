import * as v from "valibot";

import { CURRENCIES } from "@/registries/TokenRegistry";

import { unsignedBigintFromStringValidator } from "./unsignedBigintFromStringValidator";

export const feesPolicyValidator = v.object(
  {
    method: v.string("method must be a string."),
    version: v.string("version must be a string."),
    bps: v.number("bps must be a number."),
    cap: v.object({
      minUnit: unsignedBigintFromStringValidator("cap.minUnit"),
      currency: v.pipe(
        v.string("currency must be a string."),
        v.picklist(CURRENCIES, `currency must be one of: ${CURRENCIES.join(", ")}`)
      )
    })
  },
  issue => `${String(issue.expected)} is required`
);
