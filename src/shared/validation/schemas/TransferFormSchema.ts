import * as v from "valibot";

import { ethereumAddressValidator } from "../rules/ethereumAddressValidator";

export const TransferAmountFormSchema = (maxAmount: number) =>
  v.pipe(
    v.number("金額を入力してください。"),
    v.minValue(0.00000000001, "0より大きい金額を指定してください。"),
    v.maxValue(maxAmount, `送金可能額を超えています。`)
  );

export const TransferAddressToFormSchema = v.pipe(
  v.string("宛先アドレスを入力してください。"),
  ethereumAddressValidator("有効な宛先を指定してください。")
);
