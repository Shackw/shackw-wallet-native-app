import * as v from "valibot";

import { TOKENS } from "@/registries/ChainTokenRegistry";

export const sendTokenFormValidator = v.pipe(
  v.string("送金する通貨を選んでください。"),
  v.picklist(TOKENS, `送金する通貨は ${TOKENS.join(" / ")} から選んでください。`)
);

export const feeTokenFormValidator = v.pipe(
  v.string("手数料に使う通貨を選んでください。"),
  v.picklist(TOKENS, `手数料に使う通貨は ${TOKENS.join(" / ")} から選んでください。`)
);
