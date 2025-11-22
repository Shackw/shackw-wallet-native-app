import * as v from "valibot";

import { CHAIN_KEYS } from "@/config/chain";
import { TOKENS } from "@/registries/TokenRegistry";
import { addressValidator } from "@/shared/validations/rules/addressValidator";

// Schema Version
const schemaVersionShape = v.literal("v1", "schemaVersion must be 'v1'");

// Chains
const chainsMetaShape = v.array(
  v.object(
    {
      symbol: v.picklist(CHAIN_KEYS, `chains[].symbol must be one of ${CHAIN_KEYS.join(", ")}`),
      id: v.number("chains[].id must be a number"),
      testnet: v.boolean("chains[].testnet must be a boolean")
    },
    issue => `${issue.path?.join(".")} is required`
  ),
  "chains must be an array"
);

// Tokens
const tokensMetaSchema = v.array(
  v.object(
    {
      symbol: v.picklist(TOKENS, `tokens[].symbol must be one of ${TOKENS.join(", ")}`),
      address: v.record(
        v.picklist(CHAIN_KEYS, `token chainSymbol must be one of ${CHAIN_KEYS.join(", ")}`),
        addressValidator("tokens[].address[...] is not a valid address")
      ),
      decimals: v.number("tokens[].decimals must be a number")
    },
    issue => `${issue.path?.join(".")} is required`
  ),
  "tokens must be an array"
);

// Fixed Fees
const fixedFeesMetaShape = v.array(
  v.object(
    {
      chainSymbol: v.picklist(CHAIN_KEYS, `fixedFees[].chainSymbol must be one of ${CHAIN_KEYS.join(", ")}`),
      tokenSymbol: v.picklist(TOKENS, `fixedFees[].tokenSymbol must be one of ${TOKENS.join(", ")}`),
      fixedFeeAmountUnits: v.string("fixedFees[].fixedFeeAmountUnits must be a string"),
      fixedFeeAmountDisplay: v.number("fixedFees[].fixedFeeAmountDisplay must be a number")
    },
    issue => `${issue.path?.join(".")} is required`
  ),
  "fixedFees must be an array"
);

// Minimum Transfers
const minTransfersMetaShape = v.array(
  v.object(
    {
      chainSymbol: v.picklist(CHAIN_KEYS, `minTransfers[].chainSymbol must be one of ${CHAIN_KEYS.join(", ")}`),
      tokenSymbol: v.picklist(TOKENS, `minTransfers[].tokenSymbol must be one of ${TOKENS.join(", ")}`),
      minUnits: v.string("minTransfers[].minUnits must be a string"),
      display: v.number("minTransfers[].display must be a number")
    },
    issue => `${issue.path?.join(".")} is required`
  ),
  "minTransfers must be an array"
);

// Contract Addresses
const contractsMetaShape = v.object(
  {
    sponsor: addressValidator("contracts.sponsor is not a valid address"),
    delegate: v.record(
      v.picklist(CHAIN_KEYS, `delegate chainSymbol must be one of ${CHAIN_KEYS.join(", ")}`),
      addressValidator("contracts.delegate[...] is not a valid address")
    ),
    registry: v.record(
      v.picklist(CHAIN_KEYS, `delegate chainSymbol must be one of ${CHAIN_KEYS.join(", ")}`),
      addressValidator("contracts.registry[...] is not a valid address")
    )
  },
  issue => `${issue.path?.join(".")} is required`
);

// Full Meta Schema
export const WalletApiMetaSchema = v.object(
  {
    schemaVersion: schemaVersionShape,
    chains: chainsMetaShape,
    tokens: tokensMetaSchema,
    fixedFees: fixedFeesMetaShape,
    minTransfers: minTransfersMetaShape,
    contracts: contractsMetaShape
  },
  issue => `Invalid meta schema: ${issue.path?.join(".") ?? "unknown field"} is required`
);
