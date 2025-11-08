import * as v from "valibot";

export const urlValidator = (field: string) =>
  v.pipe(
    v.string(`${field} must be a string.`),
    v.transform(s => s.trim()),
    v.url(`${field} must be a valid URL.`)
  );
