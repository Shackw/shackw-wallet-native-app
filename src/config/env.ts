import * as v from "valibot";

import { EnvSchema } from "@/shared/validations/schemas/EnvSchema";

export type ShackwEnv = v.InferOutput<typeof EnvSchema>;

export const ENV: ShackwEnv = v.parse(EnvSchema, {
  DATABASE_VERSION: process.env.EXPO_PUBLIC_DATABASE_VERSION,
  SECURESTORE_WALLET_KEY: process.env.EXPO_PUBLIC_SECURESTORE_WALLET_KEY,
  RPC_INFURA_ID: process.env.EXPO_PUBLIC_RPC_INFURA_ID,
  SHACKW_API_URL: process.env.EXPO_PUBLIC_SHACKW_API_URL,
  SHACKW_UNIVERSAL_LINK: process.env.EXPO_PUBLIC_SHACKW_UNIVERSAL_LINK,
  WALLETCONNECT_PROJECT_ID: process.env.EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID
});
