import * as SecureStore from "expo-secure-store";

import { IPrivateKeyRepository, PrivateKeyResult } from "@/application/ports/IPrivateKeyRepository";
import { ENV } from "@/config/env";

const STORAGE_KEY = ENV.WALLET_PRIVATE_KEY_BASE_NAME;

export class SecureStorePrivateKeyRepository implements IPrivateKeyRepository {
  private static instance: IPrivateKeyRepository | null = null;
  private static ready: Promise<IPrivateKeyRepository> | null = null;

  private items: PrivateKeyResult[] = [];

  private constructor() {}

  static async getInstance(): Promise<IPrivateKeyRepository> {
    if (this.instance) return this.instance;

    if (!this.ready) {
      this.ready = (async () => {
        const inst = new SecureStorePrivateKeyRepository();
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
      this.items = Array.isArray(parsed) ? (parsed as PrivateKeyResult[]) : [];
    } catch (e) {
      console.warn("PrivateKeySecureStore: failed to load, fallback to empty.", e);
      this.items = [];
    }
  }

  private async persist(): Promise<void> {
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(this.items), { requireAuthentication: true });
  }

  // ---- CRUD ----
  list(): PrivateKeyResult[] {
    return [...this.items];
  }

  get(wallet: string): PrivateKeyResult | undefined {
    const key = wallet.toLowerCase();
    return this.items.find(it => it.wallet.toLowerCase() === key);
  }

  async upsert(entry: PrivateKeyResult): Promise<void> {
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
