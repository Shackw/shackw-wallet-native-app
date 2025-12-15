import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react";

import Loading from "@/presentation/components/Loading";

type LoadingContextValue = {
  show: () => void;
  hide: () => void;
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export const LoadingOverlayProvider = ({ children }: PropsWithChildren) => {
  const [, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  const shownAtRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    setCount(prev => {
      const next = prev + 1;
      if (next === 1) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        shownAtRef.current = Date.now();
        setVisible(true);
      }
      return next;
    });
  }, []);

  const hide = useCallback(() => {
    setCount(prev => {
      if (prev === 0) return 0;

      const next = prev - 1;
      if (next === 0) {
        const minMs = 500;
        const shown = shownAtRef.current ?? 0;
        const elapsed = Date.now() - shown;
        const delay = Math.max(0, minMs - elapsed);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setVisible(false);
          timeoutRef.current = null;
        }, delay);
      }
      return next;
    });
  }, []);

  const withLoading = useCallback(
    async <T,>(fn: () => Promise<T>) => {
      show();
      try {
        return await fn();
      } finally {
        hide();
      }
    },
    [show, hide]
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  return (
    <LoadingContext.Provider value={{ show, hide, withLoading }}>
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
