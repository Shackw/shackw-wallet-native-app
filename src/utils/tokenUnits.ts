import { formatUnits, parseUnits } from "viem/utils";

import { TokenKind } from "@/configs/token";
import { TOKEN_REGISTRY } from "@/registries/tokenRegistry";

export const toMinUnits = (amount: string | number, token: TokenKind): bigint => {
  const { decimals } = TOKEN_REGISTRY[token];
  return parseUnits(String(amount), decimals);
};

export const toDisimals = (wei: bigint, token: TokenKind): number => {
  return Number(formatUnits(wei, TOKEN_REGISTRY[token].decimals));
};

export const toDisimalsStr = (wei: bigint, token: TokenKind): string => {
  const { decimals } = TOKEN_REGISTRY[token];
  return formatUnits(wei, decimals);
};
