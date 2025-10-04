import { Address } from "viem";

export const shortenAddress = (addr: Address, visible = 4): string => {
  const s = String(addr);
  const prefix = s.startsWith("0x") ? 2 : 0;

  let v = Math.floor(visible);
  if (!Number.isFinite(v)) v = 4;
  v = Math.min(Math.max(v, 1), 18);

  if (prefix + v + 3 + v >= s.length) return s;

  return `${s.slice(0, prefix + v)}...${s.slice(-v)}`;
};
