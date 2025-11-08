import { isAddress, getAddress } from "viem";

export const normalizeNameInput = (s: string) =>
  String(s ?? "")
    .normalize("NFC")
    .replace(/[\r\n\t]/g, "")
    .replace(/[\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]+/g, " ")
    .trim();

export const normalizeAddressInput = (s: string): string => {
  const t = s.trim();
  try {
    return isAddress(t) ? getAddress(t) : t;
  } catch {
    return t;
  }
};
