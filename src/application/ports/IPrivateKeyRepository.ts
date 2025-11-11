import { Address, Hex } from "viem";

export interface IPrivateKeyRepository {
  list(): PrivateKeyResult[];
  get(wallet: string): PrivateKeyResult | undefined;
  upsert(entry: PrivateKeyResult): Promise<void>;
  remove(wallet: string): Promise<void>;
  clear(): Promise<void>;
}

export type PrivateKeyResult = {
  wallet: Address;
  privateKey: Hex;
  createdAt: number;
};
