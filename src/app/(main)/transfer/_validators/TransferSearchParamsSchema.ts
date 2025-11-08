import * as v from "valibot";

import { addressFormValidator } from "@/shared/validations/forms/addressFormValidator";
import { feeTokenFormValidator } from "@/shared/validations/forms/tokenFormValidator";
import { urlFormValidator } from "@/shared/validations/forms/urlFormValidator";

export type TransferSearchParams = v.InferInput<typeof TransferSearchParamsSchema>;

export type ParsedTransferSearchParams = {
  feeToken: string;
  amount: string;
  recipient: string;
  webhookUrl: string | undefined;
};

const TransferSearchParamsSchema = v.object({
  sendToken: v.optional(feeTokenFormValidator),
  feeToken: v.optional(feeTokenFormValidator),
  recipient: v.optional(addressFormValidator),
  amount: v.optional(
    v.pipe(
      v.string("文字列で入力してください。"),
      v.nonEmpty("金額を入力してください。"),
      v.regex(/^\d+(?:\.\d+)?$/, "金額は半角数字（小数可）で入力してください。")
    )
  ),
  webhookUrl: v.optional(urlFormValidator)
});

export default TransferSearchParamsSchema;
