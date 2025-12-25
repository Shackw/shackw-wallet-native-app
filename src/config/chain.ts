import { ComponentType } from "react";
import { defineChain, type Chain as ViemChain } from "viem";

import {
  BaseIcon,
  BaseSepoliaIcon,
  ChainlIconProps,
  EthereumIcon,
  PolygonAmoyIcon,
  PolygonIcon,
  SepoliaIcon
} from "@/presentation/components/icons/chain";

// === Chain Definitions ===
const mainnet = defineChain({
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://eth.merkle.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api"
    }
  },
  testnet: false
});

const base = defineChain({
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
      apiUrl: "https://api.basescan.org/api"
    }
  },
  testnet: false
});

const polygon = defineChain({
  id: 137,
  name: "Polygon",
  nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://polygon-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://polygonscan.com",
      apiUrl: "https://api.etherscan.io/v2/api"
    }
  },
  testnet: false
});

const sepolia = defineChain({
  id: 11_155_111,
  name: "Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://11155111.rpc.thirdweb.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
      apiUrl: "https://api-sepolia.etherscan.io/api"
    }
  },
  testnet: true
});

const baseSepolia = defineChain({
  id: 84532,
  name: "Base Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://sepolia.basescan.org",
      apiUrl: "https://api-sepolia.basescan.org/api"
    }
  },
  testnet: true
});

const polygonAmoy = defineChain({
  id: 80_002,
  name: "Polygon Amoy",
  nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-amoy.polygon.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://amoy.polygonscan.com",
      apiUrl: "https://api.etherscan.io/v2/api"
    }
  },
  testnet: true
});

// === Shackw Wallet Supported Chains ===
export type Chain = (typeof CHAIN_KEYS)[number];

export const CHAIN_KEYS = ["mainnet", "base", "polygon", "sepolia", "baseSepolia", "polygonAmoy"] as const;

export const CHAINS: Record<Chain, ViemChain> = {
  mainnet,
  base,
  polygon,
  sepolia,
  baseSepolia,
  polygonAmoy
};

export const CHAIN_IDS = Object.values(CHAINS).map(c => c.id);

// === Mappimg ===
export const CHAIN_KEY_TO_DISPLAY_NAME = {
  mainnet: "Ethereum Mainnet",
  base: "Base Mainnet",
  polygon: "Polygon Mainnet",
  sepolia: "Ethereum Sepolia Testnet",
  baseSepolia: "Base Sepolia Testnet",
  polygonAmoy: "Polygon Amoy Testnet"
} as const satisfies Record<Chain, string>;

export const CHAIN_ICONS: Record<Chain, ComponentType<ChainlIconProps>> = {
  mainnet: EthereumIcon,
  base: BaseIcon,
  polygon: PolygonIcon,
  sepolia: SepoliaIcon,
  baseSepolia: BaseSepoliaIcon,
  polygonAmoy: PolygonAmoyIcon
};
