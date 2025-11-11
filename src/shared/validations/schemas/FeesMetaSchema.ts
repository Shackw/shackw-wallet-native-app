import * as v from "valibot";

import { stringBigintValidator } from "../rules/stringBigintValidator";

export const FeesMetaSchema = v.tuple([
  v.object({
    chain: v.literal("main"),
    symbol: v.literal("JPYC"),
    fixedFeeAmountUnits: stringBigintValidator("fixedFeeAmountUnits"),
    fixedFeeAmountDisplay: v.number()
  }),
  v.object({
    chain: v.literal("main"),
    symbol: v.literal("USDC"),
    fixedFeeAmountUnits: stringBigintValidator("fixedFeeAmountUnits"),
    fixedFeeAmountDisplay: v.number()
  }),
  v.object({
    chain: v.literal("main"),
    symbol: v.literal("EURC"),
    fixedFeeAmountUnits: stringBigintValidator("fixedFeeAmountUnits"),
    fixedFeeAmountDisplay: v.number()
  }),
  v.object({
    chain: v.literal("base"),
    symbol: v.literal("USDC"),
    fixedFeeAmountUnits: stringBigintValidator("fixedFeeAmountUnits"),
    fixedFeeAmountDisplay: v.number()
  }),
  v.object({
    chain: v.literal("base"),
    symbol: v.literal("EURC"),
    fixedFeeAmountUnits: stringBigintValidator("fixedFeeAmountUnits"),
    fixedFeeAmountDisplay: v.number()
  }),
  v.object({
    chain: v.literal("polygon"),
    symbol: v.literal("JPYC"),
    fixedFeeAmountUnits: stringBigintValidator("fixedFeeAmountUnits"),
    fixedFeeAmountDisplay: v.number()
  }),
  v.object({
    chain: v.literal("polygon"),
    symbol: v.literal("USDC"),
    fixedFeeAmountUnits: stringBigintValidator("fixedFeeAmountUnits"),
    fixedFeeAmountDisplay: v.number()
  })
]);
