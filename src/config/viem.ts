import { createPublicClient, http, PublicClient, Transport, Chain as ViemChain } from "viem";

import { Chain, CHAINS } from "@/config/chain";

import { RPC_TUNIGS } from "./rpcTuning";

export const VIEM_PUBLIC_CLIENTS: Record<Chain, PublicClient<Transport, ViemChain | undefined>> = {
  mainnet: createPublicClient({
    chain: CHAINS.mainnet,
    transport: http(undefined, {
      batch: RPC_TUNIGS.mainnet.batch,
      retryCount: RPC_TUNIGS.mainnet.retryCount,
      retryDelay: RPC_TUNIGS.mainnet.retryDelay
    })
  }),
  base: createPublicClient({
    chain: CHAINS.base,
    transport: http(undefined, {
      batch: RPC_TUNIGS.base.batch,
      retryCount: RPC_TUNIGS.base.retryCount,
      retryDelay: RPC_TUNIGS.base.retryDelay
    })
  }),
  polygon: createPublicClient({
    chain: CHAINS.polygon,
    transport: http(undefined, {
      batch: RPC_TUNIGS.polygon.batch,
      retryCount: RPC_TUNIGS.polygon.retryCount,
      retryDelay: RPC_TUNIGS.polygon.retryDelay
    })
  }),
  sepolia: createPublicClient({
    chain: CHAINS.sepolia,
    transport: http(undefined, {
      batch: RPC_TUNIGS.sepolia.batch,
      retryCount: RPC_TUNIGS.sepolia.retryCount,
      retryDelay: RPC_TUNIGS.sepolia.retryDelay
    })
  }),
  baseSepolia: createPublicClient({
    chain: CHAINS.baseSepolia,
    transport: http(undefined, {
      batch: RPC_TUNIGS.baseSepolia.batch,
      retryCount: RPC_TUNIGS.baseSepolia.retryCount,
      retryDelay: RPC_TUNIGS.baseSepolia.retryDelay
    })
  }),
  polygonAmoy: createPublicClient({
    chain: CHAINS.polygonAmoy,
    transport: http(undefined, {
      batch: RPC_TUNIGS.polygonAmoy.batch,
      retryCount: RPC_TUNIGS.polygonAmoy.retryCount,
      retryDelay: RPC_TUNIGS.polygonAmoy.retryDelay
    })
  })
};
