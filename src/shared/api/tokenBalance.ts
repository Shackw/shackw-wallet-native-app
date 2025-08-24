import { Address } from "viem";

import { TOKEN_TO_CONTRACT_MAP } from "../config/contracts";
import { TokenKind } from "../domain/tokens/registry";
import { toDisplayValue } from "../utils/tokenUnits";

export const getTokenBalance = async (walletAddress: Address, token: TokenKind) => {
  const erc20Contract = TOKEN_TO_CONTRACT_MAP[token];
  try {
    const balance = await erc20Contract.read.balanceOf([walletAddress]);
    return toDisplayValue(balance, token);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`getTokenBalance error: ${error.message}`, { cause: error });
    }
    throw new Error(`getTokenBalance unknown error: ${String(error)}`);
  }
};
