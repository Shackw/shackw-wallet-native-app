import * as v from "valibot";
import { SignAuthorizationReturnType } from "viem";

import { TransferTokenResponceSchema } from "./parser";

export type TransferTokenPayload = {
  quoteToken: string;
  authorization: SignAuthorizationReturnType;
};

export type TransferTokenResponce = v.InferOutput<typeof TransferTokenResponceSchema>;
