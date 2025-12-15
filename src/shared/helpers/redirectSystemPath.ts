import { ENV } from "@/config/env";
import { SecureStorePrivateKeyRepository } from "@/infrastructure/secureStore/SecureStorePrivateKeyRepository";

export const buildRedirectSystemPath = async (path: string): Promise<string> => {
  try {
    const privateKeySecureStore = await SecureStorePrivateKeyRepository.getInstance();

    const storeds = privateKeySecureStore.list();
    if (path.includes(ENV.SHACKW_UNIVERSAL_LINK) && storeds.length > 0) {
      const url = new URL(path);
      const p = url.pathname;
      const q = url.search;

      if (p.startsWith("/addresses")) return `/addresses${q}`;
      if (p.startsWith("/transfer")) return `/transfer${q}`;

      return "/";
    }
    return "/";
  } catch {
    return "/";
  }
};
