import * as v from "valibot";

import { EnvSchema } from "@/validations/schemas/EnvSchema";

export type HinomaruEnv = v.InferOutput<typeof EnvSchema>;
export type BuildEnv = HinomaruEnv["BUILD_ENV"];

export const ENV: HinomaruEnv = v.parse(EnvSchema, {
  BUILD_ENV: process.env.EXPO_PUBLIC_BUILD_ENV,
  HINOMARU_API_URL: process.env.EXPO_PUBLIC_HINOMARU_API_URL,
  WALLET_PRIVATE_KEY_BASE_NAME: process.env.EXPO_PUBLIC_WALLET_PRIVATE_KEY_BASE_NAME,
  JPYC_TOKEN_ADDRESS: process.env.EXPO_PUBLIC_JPYC_TOKEN_ADDRESS,
  USDC_TOKEN_ADDRESS: process.env.EXPO_PUBLIC_USDC_TOKEN_ADDRESS,
  EURC_TOKEN_ADDRESS: process.env.EXPO_PUBLIC_EURC_TOKEN_ADDRESS
});

export const { BUILD_ENV, HINOMARU_API_URL } = ENV;
