import { Chain, createPublicClient, http, PublicClient, Transport } from "viem";

import { SUPPORT_CHAINS, SupportChain } from "@/config/chain";

import { RPC_TUNIGS } from "./rpcTuning";

export const VIEM_PUBLIC_CLIENTS: Record<SupportChain, PublicClient<Transport, Chain, undefined>> = {
  main: createPublicClient({
    chain: SUPPORT_CHAINS.main,
    transport: http(undefined, {
      batch: RPC_TUNIGS.main.batch,
      retryCount: RPC_TUNIGS.main.retryCount,
      retryDelay: RPC_TUNIGS.main.retryDelay
    })
  }),
  base: createPublicClient({
    chain: SUPPORT_CHAINS.base,
    transport: http(undefined, {
      batch: RPC_TUNIGS.base.batch,
      retryCount: RPC_TUNIGS.base.retryCount,
      retryDelay: RPC_TUNIGS.base.retryDelay
    })
  })
};
