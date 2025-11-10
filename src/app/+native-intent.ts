import { ENV } from "@/config/env";
import { SecureStorePrivateKeyRepository } from "@/infrastructure/secureStore/SecureStorePrivateKeyRepository";

export async function redirectSystemPath({ path }: { path: string }): Promise<string> {
  const privateKeySecureStore = await SecureStorePrivateKeyRepository.getInstance();
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
