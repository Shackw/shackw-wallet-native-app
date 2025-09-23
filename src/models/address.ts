import { Address } from "viem";

export type AddressModel = {
  address: Address;
  name: string;
  isMine: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAddressCommand = Pick<AddressModel, "address" | "name" | "isMine">;

export type UpdateAddressCommand = Pick<AddressModel, "address" | "name">;
