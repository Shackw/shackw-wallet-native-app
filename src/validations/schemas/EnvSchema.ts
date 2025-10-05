import * as v from "valibot";

import { addressValidator } from "../rules/addressValidator";

export const EnvSchema = v.object(
  {
    BUILD_ENV: v.pipe(
      v.string("BUILD_ENV must be a string."),
      v.transform(s => s.trim()),
      v.picklist(["dev", "prd"], "BUILD_ENV must be 'dev' or 'prd'.")
    ),
    DATABASE_VERSION: v.pipe(
      v.string("DATABASE_VERSION is required"),
      v.trim(),
      v.transform(s => Number(s)),
      v.check(n => Number.isFinite(n), "DATABASE_VERSION must be a number"),
      v.integer("DATABASE_VERSION must be an integer"),
      v.minValue(1, "DATABASE_VERSION must be >= 1")
    ),
    HINOMARU_API_URL: v.pipe(
      v.string("HINOMARU_API_URL must be a string."),
      v.transform(s => s.trim()),
      v.url("HINOMARU_API_URL must be a valid URL.")
    ),
    HINOMARU_UNIVERSAL_LINK: v.pipe(
      v.string("HINOMARU_UNIVERSAL_LINK must be a string."),
      v.transform(s => s.trim()),
      v.url("HINOMARU_UNIVERSAL_LINK must be a valid URL.")
    ),
    WALLET_PRIVATE_KEY_BASE_NAME: v.pipe(
      v.string("WALLET_PRIVATE_KEY_BASE_NAME must be a string."),
      v.transform(s => s.trim()),
      v.minLength(1, "WALLET_PRIVATE_KEY_BASE_NAME must not be empty.")
    ),
    JPYC_TOKEN_ADDRESS: addressValidator("JPYC_TOKEN_ADDRESS"),
    USDC_TOKEN_ADDRESS: addressValidator("USDC_TOKEN_ADDRESS"),
    EURC_TOKEN_ADDRESS: addressValidator("EURC_TOKEN_ADDRESS")
  },
  issue => `${String(issue.expected)} is required`
);
