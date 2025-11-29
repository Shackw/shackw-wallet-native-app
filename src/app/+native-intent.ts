import { redirectSystemPath } from "@/shared/helpers/redirectSystemPath";

export async function redirectSystemPathNative({ path }: { path: string }) {
  return redirectSystemPath(path);
}
