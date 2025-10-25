import { ComponentType } from "react";
import { Address, erc20Abi, getContract, GetContractReturnType } from "viem";

import { TokenSymbolIconProps, JpycIcon, UsdcIcon, EurcIcon } from "@/components/Icons/TokenSymbolIcons";
import { SupportChain } from "@/configs/chain";
import { ENV } from "@/configs/env";
import { VIEM_PUBLIC_CLIENTS } from "@/registries/ViemClientRegistory";

type TokenMeta = {
  symbol: string;
  locale: string;
  currency: Currency;
  address: Address;
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
    address: ENV.JPYC_TOKEN_ADDRESS,
    decimals: 18,
    supportDecimals: 2,
    baseUnit: 10n ** 18n,
    minTransferAmountUnits: 100n * 10n ** 18n,
    contract: {
      main: getContract({ abi: erc20Abi, address: ENV.JPYC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.main }),
      base: getContract({ abi: erc20Abi, address: ENV.JPYC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.base })
    },
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
    contract: {
      main: getContract({ abi: erc20Abi, address: ENV.USDC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.main }),
      base: getContract({ abi: erc20Abi, address: ENV.USDC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.base })
    },
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
    contract: {
      main: getContract({ abi: erc20Abi, address: ENV.EURC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.main }),
      base: getContract({ abi: erc20Abi, address: ENV.EURC_TOKEN_ADDRESS, client: VIEM_PUBLIC_CLIENTS.base })
    },
    Icon: EurcIcon
  }
} as const satisfies Record<Token, TokenMeta>;

export const ADDRESS_TO_TOKEN = {
  [ENV.JPYC_TOKEN_ADDRESS.toLowerCase() as Address]: "JPYC",
  [ENV.USDC_TOKEN_ADDRESS.toLowerCase() as Address]: "USDC",
  [ENV.EURC_TOKEN_ADDRESS.toLowerCase() as Address]: "EURC"
} as const satisfies Record<Address, Token>;
