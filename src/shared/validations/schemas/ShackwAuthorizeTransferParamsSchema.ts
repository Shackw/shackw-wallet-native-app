import * as v from "valibot";

import { CHAIN_KEYS } from "@/config/chain";
import { TOKENS } from "@/registries/ChainTokenRegistry";

import { addressValidator } from "../rules/addressValidator";
import { shackwQuoteTokenValidator } from "../rules/shackwQuoteTokenValidator";

export const ShackwAuthorizeTransferParamsSchema = v.object({
  chain: v.picklist(CHAIN_KEYS, `chainId must be one of: ${CHAIN_KEYS.join(", ")}`),
  token: v.picklist(TOKENS, `token must be one of: ${TOKENS.join(", ")}`),
  feeToken: v.picklist(TOKENS, `feeToken must be one of: ${TOKENS.join(", ")}`),
  recipient: addressValidator("recipient"),
  amountDisplayValue: v.pipe(
    v.number("amountDisplayValue must be a number"),
    v.minValue(0.000001, "amountDisplayValue must be greater than 0")
  ),
  delegate: addressValidator("delegate"),
  quoteToken: shackwQuoteTokenValidator("quoteToken")
});
