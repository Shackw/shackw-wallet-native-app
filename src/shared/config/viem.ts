import { createPublicClient, http } from "viem";

import { DEFAULT_CHAIN } from "./chains";
import { ENV } from "./env";

export const VIEM_PUBLIC_CLIENT = createPublicClient({
  chain: DEFAULT_CHAIN,
  transport: http(undefined, {
    batch: {
      wait: 15,
      batchSize: 50
    },
    retryCount: 3,
    retryDelay: 250
  })
});

export const { WALLET_PRIVATE_KEY_BASE_NAME } = ENV;
