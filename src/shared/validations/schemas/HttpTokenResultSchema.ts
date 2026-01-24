import * as v from "valibot";

import type { Hex } from "viem";

export const TransferTokenResultSchema = v.object(
  {
    status: v.picklist(["submitted"], "status must be one of: submitted"),
    txHash: v.pipe(
      v.string("txHash must be a string."),
      v.transform(v => v as Hex)
    ),
    notify: v.optional(
      v.object(
        {
          webhook: v.object({
            id: v.string("notify.webhook.id must be a string"),
            echo: v.string("notify.webhook.echo must be a string")
          })
        },
        issue => `notify.${String(issue.expected)} is required`
      )
    )
  },
  issue => `${String(issue.expected)} is required`
);
