import { Chain } from "./chain";

export type RpcTuning = {
  batch: { wait: number; batchSize: number };
  retryCount: number;
  retryDelay: number;
  concurrency: number;
  chunkSize: bigint;
};

export const RPC_TUNIGS = {
  mainnet: {
    batch: { wait: 20, batchSize: 24 },
    retryCount: 3,
    retryDelay: 300,
    concurrency: 6,
    chunkSize: 3_000n
  },
  base: {
    batch: { wait: 15, batchSize: 32 },
    retryCount: 3,
    retryDelay: 300,
    concurrency: 8,
    chunkSize: 5_000n
  },
  polygon: {
    batch: { wait: 15, batchSize: 32 },
    retryCount: 3,
    retryDelay: 300,
    concurrency: 8,
    chunkSize: 5_000n
  },
  sepolia: {
    batch: { wait: 40, batchSize: 12 },
    retryCount: 4,
    retryDelay: 500,
    concurrency: 3,
    chunkSize: 1_000n
  },
  baseSepolia: {
    batch: { wait: 8, batchSize: 80 },
    retryCount: 2,
    retryDelay: 180,
    concurrency: 28,
    chunkSize: 30_000n
  },
  polygonAmoy: {
    batch: { wait: 8, batchSize: 80 },
    retryCount: 2,
    retryDelay: 180,
    concurrency: 28,
    chunkSize: 30_000n
  }
} as const satisfies Record<Chain, RpcTuning>;
