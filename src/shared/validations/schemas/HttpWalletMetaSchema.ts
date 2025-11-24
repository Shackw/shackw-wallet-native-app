import * as v from "valibot";

import { addressValidator } from "@/shared/validations/rules/addressValidator";

// Schema Version
const schemaVersionShape = v.literal("v1", "schemaVersion must be 'v1'");

// Chains
const chainsMetaShape = v.array(
  v.object(
    {
      symbol: v.string("chains[].symbol is required"),
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
      symbol: v.string("tokens[].symbol is required"),
      address: v.record(
        v.string("token chainSymbol must be a string"),
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
      chainSymbol: v.string("fixedFees[].chainSymbol is required"),
      tokenSymbol: v.string("fixedFees[].tokenSymbol is required"),
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
      chainSymbol: v.string("minTransfers[].chainSymbol is required"),
      tokenSymbol: v.string("minTransfers[].tokenSymbol is required"),
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
      v.string("delegate chainSymbol must be a string"),
      addressValidator("contracts.delegate[...] is not a valid address")
    ),
    registry: v.record(
      v.string("registry chainSymbol must be a string"),
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
