import type { Address, Hex } from "viem";

export type PrivateKeyModel = {
  name: string;
  wallet: Address;
  privateKey: Hex;
  createdAt: Date;
};

export type ListPrivateKeysCommand = { isAuthRequired: boolean };

export type StorePrivateKeyCommand = {
  name: string;
  wallet: Address;
  privateKey: Hex;
};
