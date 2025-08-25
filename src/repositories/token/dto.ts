import { Address, SignAuthorizationReturnType } from "viem";

export type TransferTokenPayload = {
  from: Address;
  chainId: number;
  authorization: SignAuthorizationReturnType;
  call: {
    to: Address;
    value: bigint;
    data: Address;
  };
  revertOnFail: boolean;
  value: bigint;
};
