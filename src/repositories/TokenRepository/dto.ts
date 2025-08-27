import * as v from "valibot";
import { SignAuthorizationReturnType } from "viem";

import { TransferTokenResponceSchema } from "./parser";

export type TransferTokenPayload = {
  quoteToken: string;
  authorizationList: SignAuthorizationReturnType;
};

export type TransferTokenResponce = v.InferOutput<typeof TransferTokenResponceSchema>;
