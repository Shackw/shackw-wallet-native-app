import type { Address, Hex } from "viem";

export type StorePrivateKeyCommand = {
  name: string;
  wallet: Address;
  privateKey: Hex;
};
