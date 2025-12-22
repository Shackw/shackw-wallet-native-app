import { useRouter } from "expo-router";
import { useCallback } from "react";

import { useLoadingOverlay } from "@/presentation/providers/LoadingOverlayProvider";
import { sleep } from "@/shared/helpers/sleep";

type UseSafeCloseToHomeOptions = {
  delayMs?: number;
};

export const useSafeCloseToHome = (options?: UseSafeCloseToHomeOptions) => {
  const router = useRouter();
  const { show, hide } = useLoadingOverlay();

  const delayMs = options?.delayMs ?? 500;

  const safeClose = useCallback(async () => {
    if (router.canDismiss()) {
      router.dismiss();
      return;
    }

    show();
    await sleep(500);
    router.dismissTo("/");

    setTimeout(() => {
      hide();
    }, delayMs);
  }, [delayMs, hide, router, show]);

  return {
    safeClose
  };
};
