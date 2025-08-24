import { createPublicClient, http } from "viem";

import { DEFAULT_CHAIN } from "./chains";
import { ENV } from "./env";

export const VIEM_PUBLIC_CLIENT = createPublicClient({
  chain: DEFAULT_CHAIN,
  transport: http()
});

export const { WALLET_PRIVATE_KEY_BASE_NAME } = ENV;
