import { ENV } from "@/configs/env";

export function redirectSystemPath({ path }: { path: string }): string {
  if (path.includes(ENV.HINOMARU_UNIVERSAL_LINK)) {
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
