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
  SECURESTORE_WALLET_KEY: v.pipe(
    v.string("SECURESTORE_WALLET_KEY must be a string."),
    v.transform(s => s.trim()),
    v.minLength(1, "SECURESTORE_WALLET_KEY must not be empty.")
  ),
  RPC_INFURA_ID: hex32Validator("RPC_INFURA_ID"),
  SHACKW_API_URL: urlValidator("SHACKW_API_URL"),
  SHACKW_UNIVERSAL_LINK: urlValidator("SHACKW_UNIVERSAL_LINK"),
  WALLETCONNECT_PROJECT_ID: v.pipe(
    v.string("WALLETCONNECT_PROJECT_ID must be a string."),
    v.transform(s => s.trim()),
    v.minLength(1, "WALLETCONNECT_PROJECT_ID must not be empty.")
  )
});
