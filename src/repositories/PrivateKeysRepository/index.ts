import * as SecureStore from "expo-secure-store";
import { Address, Hex } from "viem";

import { ENV } from "@/configs/env";

import type { IPrivateKeysRepository, BatchGetPrivateKeyResult } from "./interface";

export const SecureStorePrivateKeysRepository: IPrivateKeysRepository = {
  async get(wallet: Address): Promise<Hex> {
    const keyName = `${ENV.WALLET_PRIVATE_KEY_BASE_NAME}:${wallet}`;

    const storedPk = await SecureStore.getItemAsync(keyName);
    if (!storedPk) throw new Error("対象のウォレットが見つかりませんでした。");

    return storedPk as Hex;
  },

  async batchGet(wallets: Address[]): Promise<BatchGetPrivateKeyResult> {
    let result: BatchGetPrivateKeyResult = {};

    for (const wallet in wallets) {
      const keyName = `${ENV.WALLET_PRIVATE_KEY_BASE_NAME}:${wallet}`;
      const storedPk = await SecureStore.getItemAsync(keyName);
      if (!storedPk) continue;

      result = { ...result, [wallet]: storedPk };
    }

    return result;
  },

  async store(wallet: Address, pk: Hex): Promise<void> {
    const keyName = `${ENV.WALLET_PRIVATE_KEY_BASE_NAME}:${wallet}`;

    const storedPk = await SecureStore.getItemAsync(keyName);
    if (!!storedPk) throw new Error("すでにこのウォレットは作成されています。");

    await SecureStore.setItemAsync(keyName, pk);
  },

  async delete(wallet: Address): Promise<void> {
    const keyName = `${ENV.WALLET_PRIVATE_KEY_BASE_NAME}:${wallet}`;

    const storedPk = await SecureStore.getItemAsync(keyName);
    if (!storedPk) throw new Error("対象のウォレットが見つかりませんでした。");

    await SecureStore.deleteItemAsync(keyName);
  }
};
