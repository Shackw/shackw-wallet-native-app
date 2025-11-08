import { SupportChain } from "./chain";
import { BuildEnv, ENV } from "./env";

const BUILD_ENV_TO_CUSTOM_RPC_URLS: Record<BuildEnv, Record<SupportChain, string>> = {
  dev: {
    main: `https://sepolia.infura.io/v3/${ENV.RPC_INFURA_ID}`,
    base: `https://base-sepolia.infura.io/v3/${ENV.RPC_INFURA_ID}`
  },
  prd: {
    main: `https://mainnet.infura.io/v3/${ENV.RPC_INFURA_ID}`,
    base: `https://base-mainnet.infura.io/v3/${ENV.RPC_INFURA_ID}`
  }
};
export const CUSTOM_RPC_URLS = BUILD_ENV_TO_CUSTOM_RPC_URLS[ENV.BUILD_ENV];
