import { SupportChain } from "./chain";
import { BuildEnv, ENV } from "./env";

export type RpcTuning = {
  batch: { wait: number; batchSize: number };
  retryCount: number;
  retryDelay: number;
  concurrency: number;
  chunkSize: bigint;
};

const BUILD_ENV_TO_RPC_TUNIGS = {
  dev: {
    main: {
      batch: { wait: 40, batchSize: 12 },
      retryCount: 4,
      retryDelay: 500,
      concurrency: 3,
      chunkSize: 1_000n
    },
    base: {
      batch: { wait: 8, batchSize: 80 },
      retryCount: 2,
      retryDelay: 180,
      concurrency: 28,
      chunkSize: 30_000n
    }
  },
  prd: {
    main: {
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
    }
  }
} as const satisfies Record<BuildEnv, Record<SupportChain, RpcTuning>>;

export const RPC_TUNIGS = BUILD_ENV_TO_RPC_TUNIGS[ENV.BUILD_ENV];
