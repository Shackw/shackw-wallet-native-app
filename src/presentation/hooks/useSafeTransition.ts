import { useRouter } from "expo-router";
import { useCallback } from "react";

import { useLoadingOverlay } from "@/presentation/providers/LoadingOverlayProvider";
import { sleep } from "@/shared/helpers/sleep";

import type { Href } from "expo-router";

type UseSafeTransitionOptions = {
  delayMs?: number;
};

export const useSafeTransition = (options?: UseSafeTransitionOptions) => {
  const router = useRouter();
  const { show, hide } = useLoadingOverlay();

  const delayMs = options?.delayMs ?? 500;

  const safeTransition = useCallback(
    async (href: Href) => {
      show();
      await sleep(500);
      router.dismissTo(href);

      setTimeout(() => {
        hide();
      }, delayMs);
    },
    [delayMs, hide, router, show]
  );

  return {
    safeTransition
  };
};
