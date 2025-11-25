import * as v from "valibot";

import { CHAIN_KEYS } from "@/config/chain";

export const chainValidator = v.pipe(
  v.string("取引をするチェーンを選んでください。"),
  v.picklist(CHAIN_KEYS, `取引をするチェーンは ${CHAIN_KEYS.join(" / ")} から選んでください。`)
);
