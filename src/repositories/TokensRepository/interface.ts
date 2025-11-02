import * as v from "valibot";
import { SignAuthorizationReturnType } from "viem";

import { SupportChain } from "@/configs/chain";

import { TransferTokenResultSchema } from "./parser";

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
