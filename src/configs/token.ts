export const TOKENS = ["JPYC", "USDC", "EURC"] as const;
export type TokenKind = (typeof TOKENS)[number];
