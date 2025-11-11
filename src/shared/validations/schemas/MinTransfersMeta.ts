import * as v from "valibot";

import { stringBigintValidator } from "../rules/stringBigintValidator";

export const MinTransfersMeta = v.tuple([
  v.object({
    chain: v.literal("main"),
    symbol: v.literal("JPYC"),
    minUnits: stringBigintValidator("fixedFeeAmountUnits"),
    display: v.number()
  }),
  v.object({
    chain: v.literal("main"),
    symbol: v.literal("USDC"),
    minUnits: stringBigintValidator("fixedFeeAmountUnits"),
    display: v.number()
  }),
  v.object({
    chain: v.literal("main"),
    symbol: v.literal("EURC"),
    minUnits: stringBigintValidator("fixedFeeAmountUnits"),
    display: v.number()
  }),
  v.object({
    chain: v.literal("base"),
    symbol: v.literal("USDC"),
    minUnits: stringBigintValidator("fixedFeeAmountUnits"),
    display: v.number()
  }),
  v.object({
    chain: v.literal("base"),
    symbol: v.literal("EURC"),
    minUnits: stringBigintValidator("fixedFeeAmountUnits"),
    display: v.number()
  }),
  v.object({
    chain: v.literal("polygon"),
    symbol: v.literal("JPYC"),
    minUnits: stringBigintValidator("fixedFeeAmountUnits"),
    display: v.number()
  }),
  v.object({
    chain: v.literal("polygon"),
    symbol: v.literal("USDC"),
    minUnits: stringBigintValidator("fixedFeeAmountUnits"),
    display: v.number()
  })
]);
