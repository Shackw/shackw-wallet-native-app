import * as v from "valibot";

export const shackwQuoteTokenValidator = (field: string) =>
  v.pipe(
    v.string(`${field} must be a string.`),
    v.regex(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/, "quoteToken must be base64url 'payload.mac' format.")
  );
