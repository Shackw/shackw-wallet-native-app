import { erc20Abi, getContract } from "viem";

import type { Chain } from "@/config/chain";
import { CHAIN_KEYS, CHAINS } from "@/config/chain";
import { VIEM_PUBLIC_CLIENTS } from "@/config/viem";
import type { TokenSymbolIconProps } from "@/presentation/components/icons/token";
import { JpycIcon, UsdcIcon, EurcIcon } from "@/presentation/components/icons/token";

import type { ComponentType } from "react";
import type { Address, GetContractReturnType, PublicClient, Transport, Chain as ViemChain } from "viem";

/** TYPES */
type Erc20Instance = GetContractReturnType<typeof erc20Abi, PublicClient<Transport, ViemChain | undefined>>;

export const TOKENS_MAP = { JPYC: "JPYC", USDC: "USDC", EURC: "EURC" } as const;
export type Token = keyof typeof TOKENS_MAP;
export const TOKENS = Object.keys(TOKENS_MAP) as Token[];

export const CURRENCIES = ["JPY", "USD", "EUR"] as const;
export type Currency = (typeof CURRENCIES)[number];

/** MAPPING */
export const TOKEN_TO_SUPPORT_CHAIN = {
  JPYC: ["mainnet", "polygon", "sepolia", "polygonAmoy"],
  USDC: ["mainnet", "base", "polygon", "sepolia", "baseSepolia", "polygonAmoy"],
  EURC: ["mainnet", "base", "sepolia", "baseSepolia"]
} as const satisfies Record<Token, Chain[]>;

export const TOKEN_TO_SUPPORT_CHAIN_IDS = {
  JPYC: TOKEN_TO_SUPPORT_CHAIN.JPYC.map(c => CHAINS[c].id),
  USDC: TOKEN_TO_SUPPORT_CHAIN.USDC.map(c => CHAINS[c].id),
  EURC: TOKEN_TO_SUPPORT_CHAIN.EURC.map(c => CHAINS[c].id)
} as const satisfies Record<Token, number[]>;

export const SUPPORT_CHAIN_TO_TOKEN = {
  mainnet: ["JPYC", "USDC", "EURC"],
  base: ["USDC", "EURC"],
  polygon: ["JPYC", "USDC"],
  sepolia: ["JPYC", "USDC", "EURC"],
  baseSepolia: ["USDC", "EURC"],
  polygonAmoy: ["JPYC", "USDC"]
} as const satisfies Record<Chain, Token[]>;

export const TOKEN_ADDRESSES: Record<Token, Partial<Record<Chain, Address>>> = {
  JPYC: {
    mainnet: "0xe7c3d8c9a439fede00d2600032d5db0be71c3c29",
    polygon: "0xe7c3d8c9a439fede00d2600032d5db0be71c3c29",
    sepolia: "0xe7c3d8c9a439fede00d2600032d5db0be71c3c29",
    polygonAmoy: "0xe7c3d8c9a439fede00d2600032d5db0be71c3c29"
  },
  USDC: {
    mainnet: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    base: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    polygon: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    sepolia: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
    baseSepolia: "0x036cbd53842c5426634e7929541ec2318f3dcf7e",
    polygonAmoy: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582"
  },
  EURC: {
    mainnet: "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c",
    base: "0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42",
    sepolia: "0x08210f9170f89ab7658f0b5e3ff39b0e03c594d4",
    baseSepolia: "0x808456652fdb597867f38412077a9182bf77359f"
  }
};

export const ADDRESS_TO_TOKEN = {
  mainnet: {
    [TOKEN_ADDRESSES.JPYC.mainnet as Address]: "JPYC",
    [TOKEN_ADDRESSES.USDC.mainnet as Address]: "USDC",
    [TOKEN_ADDRESSES.EURC.mainnet as Address]: "EURC"
  },
  base: {
    [TOKEN_ADDRESSES.USDC.base as Address]: "USDC",
    [TOKEN_ADDRESSES.EURC.base as Address]: "EURC"
  },
  polygon: {
    [TOKEN_ADDRESSES.JPYC.polygon as Address]: "JPYC",
    [TOKEN_ADDRESSES.USDC.polygon as Address]: "USDC"
  },
  sepolia: {
    [TOKEN_ADDRESSES.JPYC.sepolia as Address]: "JPYC",
    [TOKEN_ADDRESSES.USDC.sepolia as Address]: "USDC",
    [TOKEN_ADDRESSES.EURC.sepolia as Address]: "EURC"
  },
  baseSepolia: {
    [TOKEN_ADDRESSES.USDC.baseSepolia as Address]: "USDC",
    [TOKEN_ADDRESSES.EURC.baseSepolia as Address]: "EURC"
  },
  polygonAmoy: {
    [TOKEN_ADDRESSES.JPYC.polygonAmoy as Address]: "JPYC",
    [TOKEN_ADDRESSES.USDC.polygonAmoy as Address]: "USDC"
  }
} as const satisfies Record<Chain, Partial<Record<Address, Token>>>;

const createErc20Contracts = (token: Token): Partial<Record<Chain, Erc20Instance>> => {
  const byChain = TOKEN_ADDRESSES[token];
  const contracts: Partial<Record<Chain, Erc20Instance>> = {};

  (Object.entries(byChain) as [Chain, Address][]).forEach(([chain, address]) => {
    contracts[chain] = getContract({
      abi: erc20Abi,
      address,
      client: VIEM_PUBLIC_CLIENTS[chain]
    });
  });

  return contracts;
};

/** TOKEN CONSTANT */
type TokenMeta = {
  symbol: Token;
  locale: string;
  currency: Currency;
  address: Partial<Record<Chain, Address>>;
  decimals: number;
  supportDecimals: number;
  baseUnit: bigint;
  contract: Partial<Record<Chain, Erc20Instance>>;
  Icon: ComponentType<TokenSymbolIconProps>;
};

export const TOKEN_REGISTRY: Record<Token, TokenMeta> = {
  JPYC: {
    symbol: "JPYC",
    locale: "ja-JP",
    currency: "JPY",
    address: TOKEN_ADDRESSES.JPYC,
    decimals: 18,
    supportDecimals: 2,
    baseUnit: 10n ** 18n,
    contract: createErc20Contracts("JPYC"),
    Icon: JpycIcon
  },
  USDC: {
    symbol: "USDC",
    locale: "en-US",
    currency: "USD",
    address: TOKEN_ADDRESSES.USDC,
    decimals: 6,
    supportDecimals: 3,
    baseUnit: 10n ** 6n,
    contract: createErc20Contracts("USDC"),
    Icon: UsdcIcon
  },
  EURC: {
    symbol: "EURC",
    locale: "en-150",
    currency: "EUR",
    address: TOKEN_ADDRESSES.EURC,
    decimals: 6,
    supportDecimals: 3,
    baseUnit: 10n ** 6n,
    contract: createErc20Contracts("EURC"),
    Icon: EurcIcon
  }
};

/** HELPERS */
export const isChain = (value: string): value is Chain => {
  return (CHAIN_KEYS as readonly string[]).includes(value);
};

export const isToken = (value: string): value is Token => {
  return (TOKENS as readonly string[]).includes(value);
};
