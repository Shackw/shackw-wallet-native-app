import * as v from "valibot";
import { SignAuthorizationReturnType } from "viem";

import { SupportChain } from "@/config/chain";

import { TransferTokenResultSchema } from "../../infrastructure/parsers/TransferTokenResultSchema";

export interface ITokensRepository {
  transfer(query: TransferTokenQuery): Promise<TransferTokenResult>;
}

export type TransferTokenResult = v.InferOutput<typeof TransferTokenResultSchema>;

export type TransferTokenQuery = {
  chain: SupportChain;
  quoteToken: string;
  authorization: SignAuthorizationReturnType;
  notify?: {
    webhook: {
      id: string;
      url: string;
      echo: string;
    };
  };
};
