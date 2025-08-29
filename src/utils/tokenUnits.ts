import { formatUnits, parseUnits } from "viem/utils";

import { TokenKind } from "@/configs/token";
import { TOKEN_REGISTRY } from "@/registries/TokenRegistry";

export const toMinUnits = (amount: string | number, token: TokenKind): bigint => {
  const { decimals } = TOKEN_REGISTRY[token];
  return parseUnits(String(amount), decimals);
};

export const toDisimals = (minUnits: bigint, token: TokenKind): number => {
  return Number(formatUnits(minUnits, TOKEN_REGISTRY[token].decimals));
};

export const toDisimalsStr = (minUnits: bigint, token: TokenKind): string => {
  const { decimals } = TOKEN_REGISTRY[token];
  return formatUnits(minUnits, decimals);
};
