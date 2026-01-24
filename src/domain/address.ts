import type { Address } from "viem";

export type AddressModel = {
  address: Address;
  name: string;
  isMine: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type MutateAddressCommand = Pick<AddressModel, "address" | "name">;
