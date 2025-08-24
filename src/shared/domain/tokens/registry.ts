import { JpycIcon, UsdcIcon, EurcIcon, TokenSymbolIconProps } from "@/components/Icons/TokenSymbolIcons";

import type { ComponentType } from "react";

export const TOKENS = ["JPYC", "USDC", "EURC"] as const;
export type TokenKind = (typeof TOKENS)[number];

export type TokenMeta = {
  symbol: string;
  decimals: number;
  baseUnit: bigint;
  Icon: ComponentType<TokenSymbolIconProps>;
};

export const TOKEN_REGISTRY = {
  JPYC: { symbol: "JPYC", decimals: 18, baseUnit: 1_000_000_000_000_000_000n, Icon: JpycIcon },
  USDC: { symbol: "USDC", decimals: 6, baseUnit: 1_000_000n, Icon: UsdcIcon },
  EURC: { symbol: "EURC", decimals: 6, baseUnit: 1_000_000n, Icon: EurcIcon }
} as const satisfies Record<TokenKind, TokenMeta>;

export const TOKEN_DECIMALS = Object.fromEntries(
  Object.entries(TOKEN_REGISTRY).map(([k, v]) => [k, { decimals: v.decimals, baseUnit: v.baseUnit }])
) as Record<TokenKind, { decimals: number; baseUnit: bigint }>;

export const TOKEN_TO_SYMBOL_ICON = Object.fromEntries(
  Object.entries(TOKEN_REGISTRY).map(([k, v]) => [k, v.Icon])
) as Record<TokenKind, ComponentType<TokenSymbolIconProps>>;
