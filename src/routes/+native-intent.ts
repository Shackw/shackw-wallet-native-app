import { buildRedirectSystemPath } from "@/shared/helpers/path";

export async function redirectSystemPath({ path }: { path: string }) {
  const href = await buildRedirectSystemPath(path);
  return href;
}
