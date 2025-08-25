import { Hex } from "viem";

import { restClient } from "@/clients/restClient";

import type { TransferTokenPayload } from "./dto";

export const TokenRepository = {
  async transfer(payload: TransferTokenPayload): Promise<Hex> {
    const res = await restClient.post<{ hash: Hex }>("/api/v1/test", payload);
    return res.hash;
  }
};
