import type { Token } from "@/registries/ChainTokenRegistry";

export type QuoteModel = {
  quoteToken: string;
  expiresAt: Date;
  chainId: number;
  sender: `0x${string}`;
  recipient: `0x${string}`;
  token: Token;
  feeToken: Token;
  amount: {
    minUnits: bigint;
    displyValue: number;
  };
  fee: {
    minUnits: bigint;
    displyValue: number;
  };
  delegate: `0x${string}`;
  sponsor: `0x${string}`;
  policy: { bps: number; cap: bigint };
};
