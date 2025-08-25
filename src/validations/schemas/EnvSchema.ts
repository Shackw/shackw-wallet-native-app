import * as v from "valibot";
import { Address } from "viem";

import { addressValidator } from "../rules/addressValidator";

export const EnvSchema = v.object({
  BUILD_ENV: v.union([v.literal("dev"), v.literal("prd")]),
  HINOMARU_API_URL: v.pipe(v.string(), v.url()),
  WALLET_PRIVATE_KEY_BASE_NAME: v.pipe(v.string()),
  JPYC_TOKEN_ADDRESS: v.pipe(
    v.string(),
    addressValidator("Invalid address: JPYC_TOKEN_ADDRESS"),
    v.transform(s => s as Address)
  ),
  USDC_TOKEN_ADDRESS: v.pipe(
    v.string(),
    addressValidator("Invalid address: USDC_TOKEN_ADDRESS"),
    v.transform(s => s as Address)
  ),
  EURC_TOKEN_ADDRESS: v.pipe(
    v.string(),
    addressValidator("Invalid address: EURC_TOKEN_ADDRESS"),
    v.transform(s => s as Address)
  ),
  DELEGATE_CONTRACT_ADDRESS: v.pipe(
    v.string(),
    addressValidator("Invalid address: DELEGATE_CONTRACT_ADDRESS"),
    v.transform(s => s as Address)
  )
});
