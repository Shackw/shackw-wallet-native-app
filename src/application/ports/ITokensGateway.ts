import * as v from "valibot";
import { SignAuthorizationReturnType } from "viem";

import { Chain } from "@/config/chain";
import { TransferTokenResultSchema } from "@/shared/validations/schemas/HttpTokenResultSchema";

export interface ITokensGateway {
  transfer(query: TransferTokenQuery): Promise<TransferTokenResult>;
}

export type TransferTokenResult = v.InferOutput<typeof TransferTokenResultSchema>;

export type TransferTokenQuery = {
  chain: Chain;
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
