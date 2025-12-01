import { createContext, PropsWithChildren, useCallback, useContext, useRef, useState } from "react";

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

  const show = useCallback(() => {
    setCount(prev => {
      const next = prev + 1;
      if (next === 1) {
        shownAtRef.current = Date.now();
        setVisible(true);
      }
      return next;
    });
  }, []);

  const hide = useCallback(() => {
    setCount(prev => {
      const next = Math.max(0, prev - 1);
      if (next === 0) {
        const minMs = 500;
        const shown = shownAtRef.current ?? 0;
        const elapsed = Date.now() - shown;

        if (elapsed >= minMs) {
          setVisible(false);
        } else {
          setTimeout(() => setVisible(false), minMs - elapsed);
        }
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
