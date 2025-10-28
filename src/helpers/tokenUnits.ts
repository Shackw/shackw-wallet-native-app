import { formatUnits, parseUnits } from "viem/utils";

import { Token, TOKEN_REGISTRY } from "@/registries/TokenRegistry";

export const toMinUnits = (amount: string | number, token: Token): bigint => {
  const { decimals } = TOKEN_REGISTRY[token];
  return parseUnits(String(amount), decimals);
};

export const toDecimals = (minUnits: bigint, token: Token): number => {
  return Number(formatUnits(minUnits, TOKEN_REGISTRY[token].decimals));
};

export const toDecimalsStr = (minUnits: bigint, token: Token): string => {
  const { decimals } = TOKEN_REGISTRY[token];
  return formatUnits(minUnits, decimals);
};

const _truncateAllowed = (amount: number, token: Token): number => {
  const { supportDecimals } = TOKEN_REGISTRY[token];
  if (!Number.isFinite(amount)) return amount;
  const d = Math.max(0, supportDecimals | 0);
  if (d === 0) return Math.trunc(amount);
  const f = 10 ** d;
  return amount >= 0 ? Math.floor(amount * f) / f : Math.ceil(amount * f) / f;
};

export const toAllowed = (amount: number, token: Token): number => _truncateAllowed(amount, token);

export const toAllowedStr = (amount: number, token: Token, useGrouping = false): string => {
  if (!Number.isFinite(amount)) return "";
  const truncated = _truncateAllowed(amount, token);
  const { locale, supportDecimals } = TOKEN_REGISTRY[token];
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: Math.max(0, supportDecimals),
    useGrouping
  }).format(truncated);
};
