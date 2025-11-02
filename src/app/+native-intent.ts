import { ENV } from "@/configs/env";
import { PrivateKeySecureStore } from "@/db/secureStores/PrivateKeySecureStore";

export async function redirectSystemPath({ path }: { path: string }): Promise<string> {
  const privateKeySecureStore = await PrivateKeySecureStore.getInstance();
  const storeds = privateKeySecureStore.list();

  if (path.includes(ENV.HINOMARU_UNIVERSAL_LINK) && storeds.length > 0) {
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
