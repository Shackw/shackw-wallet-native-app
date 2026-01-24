import { createContext, useContext } from "react";

import type { ShackwApiMetaModel } from "@/domain/shackwApiMeta";

import type { ReactNode } from "react";

type ShackwApiMetaProviderProps = {
  meta: ShackwApiMetaModel;
  children: ReactNode;
};

type ShackwApiMetaContextValue = {
  meta: ShackwApiMetaModel;
};

const ShackwApiMetaContext = createContext<ShackwApiMetaContextValue | undefined>(undefined);

export const ShackwApiMetaProvider = (props: ShackwApiMetaProviderProps) => {
  const { meta, children } = props;

  return <ShackwApiMetaContext.Provider value={{ meta }}>{children}</ShackwApiMetaContext.Provider>;
};

export const useShackwApiMetaContext = () => {
  const ctx = useContext(ShackwApiMetaContext);
  if (!ctx) throw new Error("ShackwApiMetaProvider is not mounted. Wrap your component with <ShackwApiMetaProvider>.");
  return ctx;
};
