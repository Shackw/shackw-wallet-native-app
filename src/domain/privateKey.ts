import type { Address, Hex } from "viem";

export type PrivateKeyModel = {
  name: string;
  wallet: Address;
  privateKey: Hex;
  enabled: boolean;
  createdAt: Date;
};

export type GetPrivateKeyByWalletCommand = { wallet: Address; isAuthRequired: boolean };

export type ListPrivateKeysCommand = { isAuthRequired: boolean };

export type PrivateKeyVerifySegment = {
  startIndex: number;
  endIndex: number;
  value: string;
};

export type EnablePrivateKeyCommand = {
  wallet: Address;
  segments: PrivateKeyVerifySegment[];
};

export type StorePrivateKeyCommand = {
  name: string;
  wallet: Address;
  privateKey: Hex;
  enabled: boolean;
};
