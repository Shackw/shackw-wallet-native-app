import * as SecureStore from "expo-secure-store";
import { Address, Hex } from "viem";

import { ENV } from "@/config/env";

type PrivateKeySecureStoreValue = {
  wallet: Address;
  privateKey: Hex;
  createdAt: number;
};

const STORAGE_KEY = ENV.WALLET_PRIVATE_KEY_BASE_NAME;

export class PrivateKeySecureStore {
  private static instance: PrivateKeySecureStore | null = null;
  private static ready: Promise<PrivateKeySecureStore> | null = null;

  private items: PrivateKeySecureStoreValue[] = [];

  private constructor() {}

  static async getInstance(): Promise<PrivateKeySecureStore> {
    if (this.instance) return this.instance;

    if (!this.ready) {
      this.ready = (async () => {
        const inst = new PrivateKeySecureStore();
        await inst.load();
        this.instance = inst;
        return inst;
      })();
    }
    return this.ready;
  }

  // ---- Persistence ----
  private async load(): Promise<void> {
    try {
      const stored = await SecureStore.getItemAsync(STORAGE_KEY, { requireAuthentication: true });
      if (!stored) {
        this.items = [];
        return;
      }
      const parsed = JSON.parse(stored) as unknown;
      this.items = Array.isArray(parsed) ? (parsed as PrivateKeySecureStoreValue[]) : [];
    } catch (e) {
      console.warn("PrivateKeySecureStore: failed to load, fallback to empty.", e);
      this.items = [];
    }
  }

  private async persist(): Promise<void> {
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(this.items), { requireAuthentication: true });
  }

  // ---- CRUD ----
  list(): PrivateKeySecureStoreValue[] {
    return [...this.items];
  }

  get(wallet: string): PrivateKeySecureStoreValue | undefined {
    const key = wallet.toLowerCase();
    return this.items.find(it => it.wallet.toLowerCase() === key);
  }

  async upsert(entry: PrivateKeySecureStoreValue): Promise<void> {
    const key = entry.wallet.toLowerCase();
    const idx = this.items.findIndex(it => it.wallet.toLowerCase() === key);
    if (idx >= 0) this.items[idx] = entry;
    else this.items.push(entry);
    await this.persist();
  }

  async remove(wallet: string): Promise<void> {
    const key = wallet.toLowerCase();
    const next = this.items.filter(it => it.wallet.toLowerCase() !== key);
    if (next.length !== this.items.length) {
      this.items = next;
      await this.persist();
    }
  }

  async clear(): Promise<void> {
    this.items = [];
    await this.persist();
  }
}
