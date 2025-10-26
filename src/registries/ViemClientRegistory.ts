import { Chain, createPublicClient, http, PublicClient, Transport } from "viem";

import { SUPPORT_CHAINS, SupportChain } from "@/configs/chain";

export const VIEM_PUBLIC_CLIENTS: Record<SupportChain, PublicClient<Transport, Chain, undefined>> = {
  main: createPublicClient({
    chain: SUPPORT_CHAINS.main,
    transport: http(undefined, {
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
    transport: http(undefined, {
      batch: {
        wait: 15,
        batchSize: 50
      },
      retryCount: 3,
      retryDelay: 250
    })
  })
};
