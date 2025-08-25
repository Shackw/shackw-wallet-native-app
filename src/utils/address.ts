import { Address } from "viem";

export const shortenAddress = (addr: Address, length = 4) => {
  return `${addr.slice(0, length + 2)}...${addr.slice(-length)}`;
};
