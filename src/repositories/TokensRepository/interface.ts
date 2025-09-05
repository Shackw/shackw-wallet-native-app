import * as v from "valibot";
import { SignAuthorizationReturnType } from "viem";

import { TransferTokenResponceSchema } from "./parser";

export type TransferTokenPayload = {
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

export type TransferTokenResponce = v.InferOutput<typeof TransferTokenResponceSchema>;
