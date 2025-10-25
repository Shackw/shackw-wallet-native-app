import { Chain, createPublicClient, http, PublicClient, Transport } from "viem";

import { SUPPORT_CHAINS, SupportChain } from "@/configs/chain";
import { CUSTOM_RPC_URLS } from "@/configs/rpcUrls";

export const VIEM_PUBLIC_CLIENTS: Record<SupportChain, PublicClient<Transport, Chain, undefined>> = {
  main: createPublicClient({
    chain: SUPPORT_CHAINS.main,
    transport: http(CUSTOM_RPC_URLS.main, {
      batch: {
        wait: 15,
        batchSize: 50
      },
      retryCount: 3,
      retryDelay: 250
    })
  }),
  base: createPublicClient({
    chain: SUPPORT_CHAINS.base,
    transport: http(CUSTOM_RPC_URLS.base, {
      batch: {
        wait: 15,
        batchSize: 50
      },
      retryCount: 3,
      retryDelay: 250
    })
  })
};
