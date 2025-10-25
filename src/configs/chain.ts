import { base, baseSepolia, type Chain } from "viem/chains";

import { ENV, type BuildEnv } from "./env";

const BUILD_ENV_TO_DEFAULT_CHAIN: Record<BuildEnv, Chain> = {
  dev: baseSepolia,
  prd: base
};

export const DEFAULT_CHAIN = BUILD_ENV_TO_DEFAULT_CHAIN[ENV.BUILD_ENV];
