import { ComponentType } from "react";
import { Address, erc20Abi, getContract, GetContractReturnType } from "viem";

import { SupportChain } from "@/config/chain";
import { ENV } from "@/config/env";
import { VIEM_PUBLIC_CLIENTS } from "@/config/viem";
import { TokenSymbolIconProps, JpycIcon, UsdcIcon, EurcIcon } from "@/presentation/components/Icons/TokenSymbolIcons";

type TokenMeta = {
  symbol: string;
  locale: string;
  currency: Currency;
  address: Record<SupportChain, Address>;
  decimals: number;
  supportDecimals: number;
  baseUnit: bigint;
  minTransferAmountUnits: bigint;
  contract: Record<SupportChain, GetContractReturnType>;
  Icon: ComponentType<TokenSymbolIconProps>;
};

export const TOKENS_MAP = { JPYC: "JPYC", USDC: "USDC", EURC: "EURC" } as const;
export type Token = keyof typeof TOKENS_MAP;
export const TOKENS = Object.keys(TOKENS_MAP) as Token[];

export const CURRENCIES = ["JPY", "USD", "EUR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const TOKEN_REGISTRY = {
  JPYC: {
    symbol: "JPYC",
    locale: "ja-JP",
    currency: "JPY",
    address: {
      main: ENV.MAIN_JPYC_TOKEN_ADDRESS,
      base: ENV.BASE_JPYC_TOKEN_ADDRESS
    },
    decimals: 18,
    supportDecimals: 2,
    baseUnit: 10n ** 18n,
    minTransferAmountUnits: 100n * 10n ** 18n,
    contract: {
      main: getContract({ abi: erc20Abi, address: ENV.MAIN_JPYC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.main }),
      base: getContract({ abi: erc20Abi, address: ENV.BASE_JPYC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.base })
    },
    Icon: JpycIcon
  },
  USDC: {
    symbol: "USDC",
    locale: "en-US",
    currency: "USD",
    address: {
      main: ENV.MAIN_USDC_TOKEN_ADDRESS,
      base: ENV.BASE_USDC_TOKEN_ADDRESS
    },
    decimals: 6,
    supportDecimals: 3,
    baseUnit: 10n ** 6n,
    minTransferAmountUnits: 10n ** 6n,
    contract: {
      main: getContract({ abi: erc20Abi, address: ENV.MAIN_USDC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.main }),
      base: getContract({ abi: erc20Abi, address: ENV.BASE_USDC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.base })
    },
    Icon: UsdcIcon
  },
  EURC: {
    symbol: "EURC",
    locale: "en-150",
    currency: "EUR",
    address: {
      main: ENV.MAIN_EURC_TOKEN_ADDRESS,
      base: ENV.BASE_EURC_TOKEN_ADDRESS
    },
    decimals: 6,
    supportDecimals: 3,
    baseUnit: 10n ** 6n,
    minTransferAmountUnits: 10n ** 6n,
    contract: {
      main: getContract({ abi: erc20Abi, address: ENV.MAIN_EURC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.main }),
      base: getContract({ abi: erc20Abi, address: ENV.BASE_EURC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.base })
    },
    Icon: EurcIcon
  }
} as const satisfies Record<Token, TokenMeta>;

export const ADDRESS_TO_TOKEN = {
  main: {
    [ENV.MAIN_JPYC_TOKEN_ADDRESS.toLowerCase() as Address]: "JPYC",
    [ENV.MAIN_USDC_TOKEN_ADDRESS.toLowerCase() as Address]: "USDC",
    [ENV.MAIN_EURC_TOKEN_ADDRESS.toLowerCase() as Address]: "EURC"
  },
  base: {
    [ENV.BASE_JPYC_TOKEN_ADDRESS.toLowerCase() as Address]: "JPYC",
    [ENV.BASE_USDC_TOKEN_ADDRESS.toLowerCase() as Address]: "USDC",
    [ENV.BASE_EURC_TOKEN_ADDRESS.toLowerCase() as Address]: "EURC"
  }
} as const satisfies Record<SupportChain, Record<Address, Token>>;
