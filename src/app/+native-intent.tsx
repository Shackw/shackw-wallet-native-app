import * as SecureStore from "expo-secure-store";

import { ENV } from "@/configs/env";
import { WALLET_PRIVATE_KEY_BASE_NAME } from "@/configs/viem";

export async function redirectSystemPath({ path }: { path: string }): Promise<string> {
  const storedPk = await SecureStore.getItemAsync(WALLET_PRIVATE_KEY_BASE_NAME);

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
