import * as v from "valibot";

import { Token, TOKEN_REGISTRY } from "@/registries/TokenRegistry";
import { toDisplyValue } from "@/shared/helpers/tokenUnits";
import { feeTokenFormValidator } from "@/shared/validations/forms/tokenFormValidator";
import { urlFormValidator } from "@/shared/validations/forms/urlFormValidator";

export type ReceiveFormValues = v.InferInput<ReturnType<typeof buildReceiveSchema>>;

const buildReceiveSchema = (sendToken: Token) => {
  const fraction = TOKEN_REGISTRY[sendToken].supportDecimals;
  const minAmount = toDisplyValue(TOKEN_REGISTRY[sendToken].minTransferAmountUnits, sendToken);
  const amountPattern = new RegExp(`^\\d+(?:\\.\\d{1,${fraction}})?$`);

  return v.object({
    feeToken: feeTokenFormValidator,
    amount: v.pipe(
      v.string("金額を入力してください。"),
      v.transform(s => s.trim()),
      v.minLength(1, "金額を入力してください。"),
      v.regex(amountPattern, `数値で入力してください（小数は最大 ${fraction} 桁まで）。`),
      v.transform(s => Number(s)),
      v.number("金額は数値で入力してください。"),
      v.minValue(minAmount, `最低請求可能額は ${minAmount} ${sendToken} です。`)
    ),
    webhookUrl: v.optional(urlFormValidator)
  });
};

export default buildReceiveSchema;
