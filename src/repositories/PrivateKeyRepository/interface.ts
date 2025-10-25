import { Address, Hex } from "viem";

export interface IPrivateKeyRepository {
  get(wallet: Address): Promise<Hex>;
  batchGet(wallets: Address[]): Promise<PrivateKeyResult>;
  store(wallet: Address, pk: Hex): Promise<void>;
  delete(wallet: Address): Promise<void>;
}

export type PrivateKeyResult = {
  [wallet: Address]: Hex;
};
