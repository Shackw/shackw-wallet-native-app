import { mainnet, base, sepolia, baseSepolia, type Chain } from "viem/chains";

import { ENV, type BuildEnv } from "./env";

export const SUPPORT_CHAIN_KEYS_MAP = {
  main: `Ethereum ${ENV.BUILD_ENV === "prd" ? "Main" : "Test"} Net`,
  base: `Base ${ENV.BUILD_ENV === "prd" ? "Main" : "Test"} Net`
} as const;
export type SupportChain = keyof typeof SUPPORT_CHAIN_KEYS_MAP;
export const SUPPORT_CHAIN_KEYS = Object.keys(SUPPORT_CHAIN_KEYS_MAP) as SupportChain[];

const BUILD_ENV_TO_SUPPORT_CHAINS: Record<BuildEnv, Record<SupportChain, Chain>> = {
  dev: {
    main: sepolia,
    base: baseSepolia
  },
  prd: {
    main: mainnet,
    base: base
  }
};
export const SUPPORT_CHAINS = BUILD_ENV_TO_SUPPORT_CHAINS[ENV.BUILD_ENV];
export const SUPPORT_CHAIN_IDS = Object.values(SUPPORT_CHAINS).map(c => c.id);
