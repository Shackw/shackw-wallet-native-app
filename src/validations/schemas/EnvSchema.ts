import * as v from "valibot";

import { addressValidator } from "../rules/addressValidator";

export const EnvSchema = v.object({
  BUILD_ENV: v.union([v.literal("dev"), v.literal("prd")]),
  HINOMARU_API_URL: v.pipe(v.string(), v.url()),
  WALLET_PRIVATE_KEY_BASE_NAME: v.pipe(v.string()),
  JPYC_TOKEN_ADDRESS: addressValidator("Invalid address: JPYC_TOKEN_ADDRESS"),
  USDC_TOKEN_ADDRESS: addressValidator("Invalid address: USDC_TOKEN_ADDRESS"),
  EURC_TOKEN_ADDRESS: addressValidator("Invalid address: EURC_TOKEN_ADDRESS")
});
