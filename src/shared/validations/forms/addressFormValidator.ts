import * as v from "valibot";
import { isAddress, zeroAddress } from "viem";

export const addressFormValidator = v.pipe(
  v.string("アドレスは文字列で入力してください。"),
  v.regex(/^0x[0-9a-fA-F]{40}$/, "アドレスは0xで始まる40桁の16進数で入力してください。"),
  v.custom(
    (s): s is string => typeof s === "string" && s.toLowerCase() !== zeroAddress,
    () => "アドレスに 0x0..00 は指定できません。"
  ),
  v.custom(
    (s): s is string => typeof s === "string" && isAddress(s),
    () => "アドレスは有効なEVMアドレスを入力してください。"
  )
);
