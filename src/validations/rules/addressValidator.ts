import * as v from "valibot";
import { isAddress } from "viem";

export const addressValidator = (errorMes: string) =>
  v.custom<string>(
    (value): value is string => typeof value === "string" && isAddress(value),
    () => errorMes
  );
