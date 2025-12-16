import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import Loading from "@/presentation/components/Loading";

type ShowOptions = {
  minMs?: number;
  extendMinDuration?: boolean;
};

type HideOptions = {
  immediate?: boolean;
};

type LoadingContextValue = {
  show: (opts?: ShowOptions) => void;
  hide: (opts?: HideOptions) => void;
  withLoading: <T>(fn: () => T | Promise<T>, opts?: ShowOptions) => Promise<T>;
  reset: (opts?: { hide?: boolean }) => void;
  visible: boolean;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

type LoadingOverlayProviderProps = PropsWithChildren<{
  minMs?: number;
  extendMinDurationOnShow?: boolean;
}>;

export const LoadingOverlayProvider = ({
  children,
  minMs: defaultMinMs = 750,
  extendMinDurationOnShow = false
}: LoadingOverlayProviderProps) => {
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

  const show = useCallback(
    (opts?: ShowOptions) => {
      const extend = opts?.extendMinDuration ?? extendMinDurationOnShow;

      setCount(prev => {
        const next = prev + 1;
        countRef.current = next;

        if (extend) {
          shownAtRef.current = Date.now();
        }

        if (next === 1) {
          clearHideTimer();
          shownAtRef.current = Date.now();
          setVisible(true);
        }

        return next;
      });
    },
    [clearHideTimer, extendMinDurationOnShow]
  );

  const hide = useCallback(
    (opts?: HideOptions) => {
      setCount(prev => {
        if (prev === 0) return 0;

        const next = prev - 1;
        countRef.current = next;

        if (next === 0) {
          if (opts?.immediate) {
            clearHideTimer();
            setVisible(false);
            return 0;
          }

          const minMs = defaultMinMs;
          const shownAt = shownAtRef.current ?? Date.now();
          const elapsed = Date.now() - shownAt;
          const delay = Math.max(0, minMs - elapsed);

          clearHideTimer();
          hideTimerRef.current = setTimeout(() => {
            if (countRef.current === 0) setVisible(false);
            hideTimerRef.current = null;
          }, delay);
        }

        return next;
      });
    },
    [clearHideTimer, defaultMinMs]
  );

  const withLoading = useCallback(
    async <T,>(fn: () => T | Promise<T>, opts?: ShowOptions) => {
      show(opts);
      try {
        return await fn();
      } finally {
        hide();
      }
    },
    [show, hide]
  );

  const reset = useCallback(
    (opts?: { hide?: boolean }) => {
      clearHideTimer();
      countRef.current = 0;
      shownAtRef.current = null;
      setCount(0);
      if (opts?.hide ?? true) setVisible(false);
    },
    [clearHideTimer]
  );

  useEffect(() => {
    return () => {
      clearHideTimer();
    };
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
