import { buildRedirectSystemPath } from "@/shared/helpers/redirectSystemPath";

export async function redirectSystemPath({ path }: { path: string }) {
  return buildRedirectSystemPath(path);
}
