import * as v from "valibot";

export const ShackwSignInParamsSchema = v.object({
  message: v.pipe(
    v.string("message must be a string"),
    v.minLength(1, "message must not be empty"),
    v.maxLength(500, "message too long")
  ),
  nonce: v.pipe(
    v.string("nonce must be a string"),
    v.regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, "nonce must be UUIDv4 format")
  )
});
