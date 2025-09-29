export const SAFE_NAME_CHARS: RegExp = (() => {
  try {
    return new RegExp("^[^\\p{C}\\u200B-\\u200D\\u2060\\uFEFF<>[\\]{}\\\\]+$", "u");
  } catch {
    return /^[^\x00-\x1F\x7F-\x9F\u200B-\u200D\u2060\uFEFF<>[\]{}\\]+$/;
  }
})();
