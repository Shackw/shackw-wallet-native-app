import * as v from "valibot";

import { SAFE_NAME_CHARS } from "@/helpers/regExp";

export const nameFormValidator = v.pipe(
  v.string("名前は文字列で入力してください"),
  v.minLength(1, "名前は1文字以上で入力してください"),
  v.maxLength(12, "名前は12文字以下で入力してください"),
  v.regex(SAFE_NAME_CHARS, "名前には危険記号・制御文字を含めることができません。")
);
