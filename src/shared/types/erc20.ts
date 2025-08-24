import type { Address, Hex } from "viem";

export type Erc20Transfer = {
  txHash: Hex;
  blockNumber: bigint;
  logIndex: number;
  token: Address;
  from: Address;
  to: Address;
  value: bigint;
  timestamp: number;
};
