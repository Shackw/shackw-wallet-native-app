import * as v from "valibot";

export const urlFormValidator = v.pipe(
  v.string("文字列で入力してください。"),
  v.transform(s => s.trim()),
  v.url("URLの形式ではありません。")
);
