import * as v from "valibot";

import { hex32Validator } from "../rules/addressValidator";
import { urlValidator } from "../rules/urlValidator";

export const EnvSchema = v.object({
  DATABASE_VERSION: v.pipe(
    v.string("DATABASE_VERSION is required"),
    v.trim(),
    v.transform(s => Number(s)),
    v.check(n => Number.isFinite(n), "DATABASE_VERSION must be a number"),
    v.integer("DATABASE_VERSION must be an integer"),
    v.minValue(1, "DATABASE_VERSION must be >= 1")
  ),
  WALLET_PRIVATE_KEY_BASE_NAME: v.pipe(
    v.string("WALLET_PRIVATE_KEY_BASE_NAME must be a string."),
    v.transform(s => s.trim()),
    v.minLength(1, "WALLET_PRIVATE_KEY_BASE_NAME must not be empty.")
  ),
  RPC_INFURA_ID: hex32Validator("RPC_INFURA_ID"),
  SHACKW_API_URL: urlValidator("SHACKW_API_URL"),
  SHACKW_UNIVERSAL_LINK: urlValidator("SHACKW_UNIVERSAL_LINK")
});
