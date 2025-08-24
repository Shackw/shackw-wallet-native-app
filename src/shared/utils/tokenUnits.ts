import { parseUnits, formatUnits } from "viem";

import { TOKEN_REGISTRY, TokenKind } from "@/shared/domain/tokens/registry";

export const toWei = (amount: string | number, token: TokenKind): bigint => {
  const { decimals } = TOKEN_REGISTRY[token];
  return parseUnits(String(amount), decimals);
};

export const toDisplayValue = (wei: bigint, token: TokenKind): string => {
  const { decimals } = TOKEN_REGISTRY[token];
  return formatUnits(wei, decimals);
};

export const toDisplayValueNumber = (wei: bigint, token: TokenKind): number => {
  return Number(formatUnits(wei, TOKEN_REGISTRY[token].decimals));
};
