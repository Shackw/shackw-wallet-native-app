import { ComponentType } from "react";
import { Address, erc20Abi, getContract, GetContractReturnType } from "viem";

import { TokenSymbolIconProps, JpycIcon, UsdcIcon, EurcIcon } from "@/components/Icons/TokenSymbolIcons";
import { ENV } from "@/configs/env";
import { VIEM_PUBLIC_CLIENT } from "@/configs/viem";

type TokenMeta = {
  symbol: string;
  locale: string;
  currency: Currency;
  address: Address;
  decimals: number;
  supportDecimals: number;
  baseUnit: bigint;
  minTransferAmountUnits: bigint;
  contract: GetContractReturnType;
  Icon: ComponentType<TokenSymbolIconProps>;
};

export const TOKENS = ["JPYC", "USDC", "EURC"] as const;
export type Token = (typeof TOKENS)[number];

export const CURRENCIES = ["JPY", "USD", "EUR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const TOKEN_REGISTRY = {
  JPYC: {
    symbol: "JPYC",
    locale: "ja-JP",
    currency: "JPY",
    address: ENV.JPYC_TOKEN_ADDRESS,
    decimals: 18,
    supportDecimals: 2,
    baseUnit: 10n ** 18n,
    minTransferAmountUnits: 100n * 10n ** 18n,
    contract: getContract({ abi: erc20Abi, address: ENV.JPYC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENT }),
    Icon: JpycIcon
  },
  USDC: {
    symbol: "USDC",
    locale: "en-US",
    currency: "USD",
    address: ENV.USDC_TOKEN_ADDRESS,
    decimals: 6,
    supportDecimals: 4,
    baseUnit: 10n ** 6n,
    minTransferAmountUnits: 10n ** 6n,
    contract: getContract({ abi: erc20Abi, address: ENV.USDC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENT }),
    Icon: UsdcIcon
  },
  EURC: {
    symbol: "EURC",
    locale: "en-150",
    currency: "EUR",
    address: ENV.EURC_TOKEN_ADDRESS,
    decimals: 6,
    supportDecimals: 4,
    baseUnit: 10n ** 6n,
    minTransferAmountUnits: 10n ** 6n,
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
