import { ComponentType } from "react";
import {
  Address,
  erc20Abi,
  getContract,
  GetContractReturnType,
  PublicClient,
  Transport,
  Chain as ViemChain
} from "viem";

import { Chain, CHAINS } from "@/config/chain";
import { ENV } from "@/config/env";
import { VIEM_PUBLIC_CLIENTS } from "@/config/viem";
import { TokenSymbolIconProps, JpycIcon, UsdcIcon, EurcIcon } from "@/presentation/components/Icons/TokenSymbolIcons";

/** TYPES */
type Erc20Instance = GetContractReturnType<typeof erc20Abi, PublicClient<Transport, ViemChain | undefined>>;

export const TOKENS_MAP = { JPYC: "JPYC", USDC: "USDC", EURC: "EURC" } as const;
export type Token = keyof typeof TOKENS_MAP;
export const TOKENS = Object.keys(TOKENS_MAP) as Token[];

export const CURRENCIES = ["JPY", "USD", "EUR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export type ChainByToken<T extends Token> = (typeof TOKEN_TO_SUPPORT_CHAIN)[T][number];
export type TokenByChain<T extends Chain> = (typeof SUPPORT_CHAIN_TO_TOKEN)[T][number];

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

export const ADDRESS_TO_TOKEN = {
  mainnet: {
    [ENV.ETH_MAIN_JPYC_TOKEN_ADDRESS.toLowerCase() as Address]: "JPYC",
    [ENV.ETH_MAIN_USDC_TOKEN_ADDRESS.toLowerCase() as Address]: "USDC",
    [ENV.ETH_MAIN_EURC_TOKEN_ADDRESS.toLowerCase() as Address]: "EURC"
  },
  base: {
    [ENV.BASE_MAIN_USDC_TOKEN_ADDRESS.toLowerCase() as Address]: "USDC",
    [ENV.BASE_MAIN_EURC_TOKEN_ADDRESS.toLowerCase() as Address]: "EURC"
  },
  polygon: {
    [ENV.POLYGON_MAIN_JPYC_TOKEN_ADDRESS.toLowerCase() as Address]: "JPYC",
    [ENV.POLYGON_MAIN_USDC_TOKEN_ADDRESS.toLowerCase() as Address]: "USDC"
  },
  sepolia: {
    [ENV.ETH_SEPOLIA_JPYC_TOKEN_ADDRESS.toLowerCase() as Address]: "JPYC",
    [ENV.ETH_SEPOLIA_USDC_TOKEN_ADDRESS.toLowerCase() as Address]: "USDC",
    [ENV.ETH_SEPOLIA_EURC_TOKEN_ADDRESS.toLowerCase() as Address]: "EURC"
  },
  baseSepolia: {
    [ENV.BASE_SEPOLIA_USDC_TOKEN_ADDRESS.toLowerCase() as Address]: "USDC",
    [ENV.BASE_SEPOLIA_EURC_TOKEN_ADDRESS.toLowerCase() as Address]: "EURC"
  },
  polygonAmoy: {
    [ENV.POLYGON_AMOY_JPYC_TOKEN_ADDRESS.toLowerCase() as Address]: "JPYC",
    [ENV.POLYGON_AMOY_USDC_TOKEN_ADDRESS.toLowerCase() as Address]: "USDC"
  }
} as const satisfies { [T in Chain]: Record<Address, TokenByChain<T>> };

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
    address: {
      mainnet: ENV.ETH_MAIN_JPYC_TOKEN_ADDRESS,
      polygon: ENV.POLYGON_MAIN_JPYC_TOKEN_ADDRESS,
      sepolia: ENV.ETH_SEPOLIA_JPYC_TOKEN_ADDRESS,
      polygonAmoy: ENV.POLYGON_AMOY_JPYC_TOKEN_ADDRESS
    },
    decimals: 18,
    supportDecimals: 2,
    baseUnit: 10n ** 18n,
    contract: {
      mainnet: getContract({
        abi: erc20Abi,
        address: ENV.ETH_MAIN_JPYC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.mainnet
      }),
      polygon: getContract({
        abi: erc20Abi,
        address: ENV.POLYGON_MAIN_JPYC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.polygon
      }),
      sepolia: getContract({
        abi: erc20Abi,
        address: ENV.ETH_SEPOLIA_JPYC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.sepolia
      }),
      polygonAmoy: getContract({
        abi: erc20Abi,
        address: ENV.POLYGON_AMOY_JPYC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.polygonAmoy
      })
    },
    Icon: JpycIcon
  },
  USDC: {
    symbol: "USDC",
    locale: "en-US",
    currency: "USD",
    address: {
      mainnet: ENV.ETH_MAIN_USDC_TOKEN_ADDRESS,
      base: ENV.BASE_MAIN_USDC_TOKEN_ADDRESS,
      polygon: ENV.POLYGON_MAIN_USDC_TOKEN_ADDRESS,
      sepolia: ENV.ETH_SEPOLIA_USDC_TOKEN_ADDRESS,
      baseSepolia: ENV.BASE_SEPOLIA_USDC_TOKEN_ADDRESS,
      polygonAmoy: ENV.POLYGON_AMOY_USDC_TOKEN_ADDRESS
    },
    decimals: 6,
    supportDecimals: 3,
    baseUnit: 10n ** 6n,
    contract: {
      mainnet: getContract({
        abi: erc20Abi,
        address: ENV.ETH_MAIN_USDC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.mainnet
      }),
      base: getContract({
        abi: erc20Abi,
        address: ENV.BASE_MAIN_USDC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.base
      }),
      polygon: getContract({
        abi: erc20Abi,
        address: ENV.POLYGON_MAIN_USDC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.polygon
      }),
      sepolia: getContract({
        abi: erc20Abi,
        address: ENV.ETH_SEPOLIA_USDC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.sepolia
      }),
      baseSepolia: getContract({
        abi: erc20Abi,
        address: ENV.BASE_SEPOLIA_USDC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.baseSepolia
      }),
      polygonAmoy: getContract({
        abi: erc20Abi,
        address: ENV.POLYGON_AMOY_USDC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.polygonAmoy
      })
    },
    Icon: UsdcIcon
  },
  EURC: {
    symbol: "EURC",
    locale: "en-150",
    currency: "EUR",
    address: {
      mainnet: ENV.ETH_MAIN_EURC_TOKEN_ADDRESS,
      base: ENV.BASE_MAIN_EURC_TOKEN_ADDRESS,
      sepolia: ENV.ETH_SEPOLIA_EURC_TOKEN_ADDRESS,
      baseSepolia: ENV.BASE_SEPOLIA_EURC_TOKEN_ADDRESS
    },
    decimals: 6,
    supportDecimals: 3,
    baseUnit: 10n ** 6n,
    contract: {
      mainnet: getContract({
        abi: erc20Abi,
        address: ENV.ETH_MAIN_EURC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.mainnet
      }),
      base: getContract({
        abi: erc20Abi,
        address: ENV.BASE_MAIN_EURC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.base
      }),
      sepolia: getContract({
        abi: erc20Abi,
        address: ENV.ETH_SEPOLIA_EURC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.sepolia
      }),
      baseSepolia: getContract({
        abi: erc20Abi,
        address: ENV.BASE_SEPOLIA_EURC_TOKEN_ADDRESS,
        client: VIEM_PUBLIC_CLIENTS.baseSepolia
      })
    },
    Icon: EurcIcon
  }
};
