import * as v from "valibot";
import { Address } from "viem";

import { addressFormValidator } from "@/validations/forms/addressFormValidator";
import { tokenFormValidator } from "@/validations/forms/tokenFormValidator";

export type TransferSearchParams = v.InferInput<typeof TransferSearchParamsSchema>;

export type ParsedTransferSearchParams = {
  feeToken: string;
  amount: string;
  recipient: Address;
  webhookUrl: string | undefined;
};

const TransferSearchParamsSchema = v.object({
  sendToken: v.optional(tokenFormValidator),
  feeToken: v.optional(tokenFormValidator),
  recipient: v.optional(addressFormValidator),
  amount: v.optional(
    v.pipe(
      v.string("文字列で入力してください。"),
      v.nonEmpty("金額を入力してください。"),
      v.regex(/^\d+(?:\.\d+)?$/, "金額は半角数字（小数可）で入力してください。")
    )
  ),
  webhookUrl: v.optional(
    v.pipe(
      v.string("文字列で入力してください。"),
      v.transform(s => s.trim()),
      v.url("URLの形式ではありません。")
    )
  )
});

export default TransferSearchParamsSchema;
