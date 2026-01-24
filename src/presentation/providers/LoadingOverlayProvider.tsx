import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import Loading from "@/presentation/components/Loading";

import type { PropsWithChildren } from "react";

const MIN_MS = 750;

type LoadingContextValue = {
  show: () => void;
  hide: () => void;
  withLoading: <T>(fn: () => T | Promise<T>) => Promise<T>;
  reset: (hide?: boolean) => void;
  visible: boolean;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export const LoadingOverlayProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(false);
  const [, setCount] = useState(0);

  const countRef = useRef(0);
  const shownAtRef = useRef<number | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const show = useCallback(() => {
    setCount(prev => {
      const next = prev + 1;
      countRef.current = next;

      shownAtRef.current = Date.now();

      if (next === 1) {
        clearHideTimer();
        setVisible(true);
      }

      return next;
    });
  }, [clearHideTimer]);

  const hide = useCallback(() => {
    setCount(prev => {
      if (prev === 0) return 0;

      const next = prev - 1;
      countRef.current = next;

      if (next === 0) {
        const shownAt = shownAtRef.current ?? Date.now();
        const elapsed = Date.now() - shownAt;
        const delay = Math.max(0, MIN_MS - elapsed);

        clearHideTimer();
        hideTimerRef.current = setTimeout(() => {
          if (countRef.current === 0) setVisible(false);
          hideTimerRef.current = null;
        }, delay);
      }

      return next;
    });
  }, [clearHideTimer]);

  const withLoading = useCallback(
    async <T,>(fn: () => T | Promise<T>) => {
      show();
      try {
        return await fn();
      } finally {
        hide();
      }
    },
    [show, hide]
  );

  const reset = useCallback(
    (hideNow: boolean = true) => {
      clearHideTimer();
      countRef.current = 0;
      shownAtRef.current = null;
      setCount(0);
      if (hideNow) setVisible(false);
    },
    [clearHideTimer]
  );

  useEffect(() => {
    return () => clearHideTimer();
  }, [clearHideTimer]);

  const value = useMemo<LoadingContextValue>(
    () => ({
      show,
      hide,
      withLoading,
      reset,
      visible
    }),
    [show, hide, withLoading, reset, visible]
  );

  return (
    <LoadingContext.Provider value={value}>
      <Loading visible={visible} />
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingOverlay = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("LoadingOverlayProvider is not mounted.");
  return ctx;
};
