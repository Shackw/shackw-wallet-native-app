import { useRouter } from "expo-router";
import { useCallback } from "react";

import { useLoadingOverlay } from "@/presentation/providers/LoadingOverlayProvider";

type UseSafeCloseToHomeOptions = {
  delayMs?: number;
};

export const useSafeCloseToHome = (options?: UseSafeCloseToHomeOptions) => {
  const router = useRouter();
  const { show, hide } = useLoadingOverlay();

  const delayMs = options?.delayMs ?? 500;

  const close = useCallback(() => {
    if (router.canDismiss()) {
      router.dismiss();
      return;
    }

    show();
    router.replace("/");

    setTimeout(() => {
      hide();
    }, delayMs);
  }, [delayMs, hide, router, show]);

  return {
    close
  };
};
