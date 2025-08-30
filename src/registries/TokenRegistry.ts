import { ComponentType } from "react";
import { Address, erc20Abi, getContract, GetContractReturnType } from "viem";

import { TokenSymbolIconProps, JpycIcon, UsdcIcon, EurcIcon } from "@/components/Icons/TokenSymbolIcons";
import { ENV } from "@/configs/env";
import { VIEM_PUBLIC_CLIENT } from "@/configs/viem";

type TokenMeta = {
  symbol: string;
  address: Address;
  decimals: number;
  baseUnit: bigint;
  contract: GetContractReturnType;
  Icon: ComponentType<TokenSymbolIconProps>;
};

export const TOKENS = ["JPYC", "USDC", "EURC"] as const;
export type Token = (typeof TOKENS)[number];

export const TOKEN_REGISTRY = {
  JPYC: {
    symbol: "JPYC",
    address: ENV.JPYC_TOKEN_ADDRESS,
    decimals: 18,
    baseUnit: 1_000_000_000_000_000_000n,
    contract: getContract({ abi: erc20Abi, address: ENV.JPYC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENT }),
    Icon: JpycIcon
  },
  USDC: {
    symbol: "USDC",
    address: ENV.USDC_TOKEN_ADDRESS,
    decimals: 6,
    baseUnit: 1_000_000n,
    contract: getContract({ abi: erc20Abi, address: ENV.USDC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENT }),
    Icon: UsdcIcon
  },
  EURC: {
    symbol: "EURC",
    address: ENV.EURC_TOKEN_ADDRESS,
    decimals: 6,
    baseUnit: 1_000_000n,
    contract: getContract({ abi: erc20Abi, address: ENV.EURC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENT }),
    Icon: EurcIcon
  }
} as const satisfies Record<Token, TokenMeta>;

export const TOKEN_TO_ADDRESS = Object.fromEntries(Object.entries(TOKEN_REGISTRY).map(([k, v]) => [k, v.address]));

export const TOKEN_TO_CONTRACT = Object.fromEntries(Object.entries(TOKEN_REGISTRY).map(([k, v]) => [k, v.contract]));

export const TOKEN_DECIMALS = Object.fromEntries(
  Object.entries(TOKEN_REGISTRY).map(([k, v]) => [k, { decimals: v.decimals, baseUnit: v.baseUnit }])
);

export const TOKEN_TO_SYMBOL_ICON = Object.fromEntries(Object.entries(TOKEN_REGISTRY).map(([k, v]) => [k, v.Icon]));
