import * as SQLite from "expo-sqlite";

import { ENV } from "@/configs/env";
import { PrivateKeyService } from "@/services/PrivateKeyService";

export async function redirectSystemPath({ path }: { path: string }): Promise<string> {
  const db = await SQLite.openDatabaseAsync("hinomaru-wallet.db");
  const storedPk = await PrivateKeyService.getDefaultPrivateKey(db)
    .catch(() => null)
    .finally(() => db.closeAsync());

  if (path.includes(ENV.HINOMARU_UNIVERSAL_LINK) && !!storedPk) {
    try {
      const url = new URL(path);
      const p = url.pathname;
      const q = url.search;

      if (p.startsWith("/wallet/addresses")) return `/addresses${q}`;
      if (p.startsWith("/wallet/transfer")) return `/transfer${q}`;

      return "/";
    } catch {
      return "/";
    }
  }
  return "/";
}
