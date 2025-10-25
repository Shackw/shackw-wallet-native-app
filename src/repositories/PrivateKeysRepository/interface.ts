import { Address, Hex } from "viem";

export interface IPrivateKeysRepository {
  get(wallet: Address): Promise<Hex>;
  batchGet(wallets: Address[]): Promise<BatchGetPrivateKeyResult>;
  store(wallet: Address, pk: Hex): Promise<void>;
  delete(wallet: Address): Promise<void>;
}

export type BatchGetPrivateKeyResult = {
  [wallet: Address]: Hex;
};
