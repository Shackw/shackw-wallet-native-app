import * as v from "valibot";

export const ShackwSignInParamsSchema = v.object({
  message: v.pipe(
    v.string("message must be a string"),
    v.minLength(1, "message must not be empty"),
    v.maxLength(500, "message too long")
  )
});
