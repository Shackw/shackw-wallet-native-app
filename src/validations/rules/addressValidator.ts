import * as v from "valibot";
import { Address, isAddress } from "viem";

export const addressValidator = (errorMes: string = "Invalid address") =>
  v.pipe(
    v.string(),
    v.custom<string>(
      (value): value is string => typeof value === "string" && isAddress(value),
      () => errorMes
    ),
    v.transform(s => s as Address)
  );
