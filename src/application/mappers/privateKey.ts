import { PrivateKeyModel } from "@/domain/privateKey";

import { PrivateKeyResult } from "../ports/IPrivateKeyRepository";

export const privateKeyResultToDomain = (name: string, result: PrivateKeyResult): PrivateKeyModel => {
  return {
    name,
    wallet: result.wallet,
    privateKey: result.privateKey,
    createdAt: new Date(result.createdAt)
  };
};
