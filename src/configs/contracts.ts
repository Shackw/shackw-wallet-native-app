import { Address, erc20Abi, getContract, GetContractReturnType } from "viem";

import { ENV } from "./env";
import { TokenKind } from "./token";
import { VIEM_PUBLIC_CLIENT } from "./viem";

export const { JPYC_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS, EURC_TOKEN_ADDRESS } = ENV;

export const TOKEN_TO_ADDRESS_MAP = {
  JPYC: JPYC_TOKEN_ADDRESS,
  USDC: USDC_TOKEN_ADDRESS,
  EURC: EURC_TOKEN_ADDRESS
} as const satisfies Record<TokenKind, Address>;

export const TOKEN_TO_CONTRACT_MAP = {
  JPYC: getContract({ abi: erc20Abi, address: TOKEN_TO_ADDRESS_MAP.JPYC, client: VIEM_PUBLIC_CLIENT }),
  USDC: getContract({ abi: erc20Abi, address: TOKEN_TO_ADDRESS_MAP.USDC, client: VIEM_PUBLIC_CLIENT }),
  EURC: getContract({ abi: erc20Abi, address: TOKEN_TO_ADDRESS_MAP.EURC, client: VIEM_PUBLIC_CLIENT })
} as const satisfies Record<TokenKind, GetContractReturnType>;
