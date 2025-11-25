import { ComponentType } from "react";
import { mainnet, base, sepolia, baseSepolia, polygon, polygonAmoy, Chain as ViemChain } from "viem/chains";

import {
  BaseIcon,
  BaseSepoliaIcon,
  ChainlIconProps,
  EthereumIcon,
  PolygonAmoyIcon,
  PolygonIcon,
  SepoliaIcon
} from "@/presentation/components/Icons/ChainIcons";

export type Chain = (typeof CHAIN_KEYS)[number];

export const CHAIN_KEYS = ["mainnet", "base", "polygon", "sepolia", "baseSepolia", "polygonAmoy"] as const;

export const CHAIN_KEY_TO_DISPLAY_NAME = {
  mainnet: "Ethereum Mainnet",
  base: "Base Mainnet",
  polygon: "Polygon Mainnet",
  sepolia: "Ethereum Sepolia Testnet",
  baseSepolia: "Base Sepolia Testnet",
  polygonAmoy: "Polygon Amoy Testnet"
} as const satisfies Record<Chain, string>;

export const CHAINS: Record<Chain, ViemChain> = {
  mainnet,
  base,
  polygon,
  sepolia,
  baseSepolia,
  polygonAmoy
};

export const CHAIN_ICONS: Record<Chain, ComponentType<ChainlIconProps>> = {
  mainnet: EthereumIcon,
  base: BaseIcon,
  polygon: PolygonIcon,
  sepolia: SepoliaIcon,
  baseSepolia: BaseSepoliaIcon,
  polygonAmoy: PolygonAmoyIcon
};

export const CHAIN_IDS = Object.values(CHAINS).map(c => c.id);
