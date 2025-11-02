import * as v from "valibot";

import { addressValidator, hex32Validator } from "../rules/addressValidator";
import { urlValidator } from "../rules/urlValidator";

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
    WALLET_PRIVATE_KEY_BASE_NAME: v.pipe(
      v.string("WALLET_PRIVATE_KEY_BASE_NAME must be a string."),
      v.transform(s => s.trim()),
      v.minLength(1, "WALLET_PRIVATE_KEY_BASE_NAME must not be empty.")
    ),

    RPC_INFURA_ID: hex32Validator("RPC_INFURA_ID"),

    HINOMARU_API_URL: urlValidator("HINOMARU_API_URL"),
    HINOMARU_UNIVERSAL_LINK: urlValidator("HINOMARU_UNIVERSAL_LINK"),

    MAIN_JPYC_TOKEN_ADDRESS: addressValidator("MAIN_JPYC_TOKEN_ADDRESS"),
    MAIN_USDC_TOKEN_ADDRESS: addressValidator("MAIN_USDC_TOKEN_ADDRESS"),
    MAIN_EURC_TOKEN_ADDRESS: addressValidator("MAIN_EURC_TOKEN_ADDRESS"),

    BASE_JPYC_TOKEN_ADDRESS: addressValidator("BASE_JPYC_TOKEN_ADDRESS"),
    BASE_USDC_TOKEN_ADDRESS: addressValidator("BASE_USDC_TOKEN_ADDRESS"),
    BASE_EURC_TOKEN_ADDRESS: addressValidator("BASE_EURC_TOKEN_ADDRESS")
  },
  issue => `${String(issue.expected)} is required`
);
