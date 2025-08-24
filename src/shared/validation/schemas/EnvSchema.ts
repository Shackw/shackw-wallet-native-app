import * as v from "valibot";

import { ethereumAddressValidator } from "../rules/ethereumAddressValidator";

export const EnvSchema = v.object({
  BUILD_ENV: v.union([v.literal("dev"), v.literal("prd")]),
  WALLET_PRIVATE_KEY_BASE_NAME: v.pipe(v.string()),
  JPYC_TOKEN_ADDRESS: v.pipe(v.string(), ethereumAddressValidator("Invalid address: JPYC_TOKEN_ADDRESS")),
  USDC_TOKEN_ADDRESS: v.pipe(v.string(), ethereumAddressValidator("Invalid address: USDC_TOKEN_ADDRESS")),
  EURC_TOKEN_ADDRESS: v.pipe(v.string(), ethereumAddressValidator("Invalid address: EURC_TOKEN_ADDRESS"))
});
