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
      if (p.startsWith("/wc")) {
        const wcUri = url.searchParams.get("uri");
        if (!!wcUri) return `/?wcUri=${encodeURIComponent(wcUri)}`;
      }

      return "/";
    }
    return "/";
  } catch {
    return "/";
  }
};

export const normalizeParams = (params: Record<string, string | string[]>): Record<string, string> => {
  return Object.entries(params).reduce(
    (acc, [key, value]) => {
      const normalizedValue = Array.isArray(value) ? String(value[0] ?? "") : String(value ?? "");
      if (normalizedValue !== "") acc[key] = normalizedValue;
      return acc;
    },
    {} as Record<string, string>
  );
};
