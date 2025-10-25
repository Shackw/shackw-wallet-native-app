import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Address } from "viem";

import { SupportChain } from "@/configs/chain";
import { useUserSetting } from "@/hooks/queries/useUserSetting";

type UserSettingContextType = {
  selectedChain: SupportChain;
  defaultWallet: Address | null | undefined;
  refetch: ReturnType<typeof useUserSetting>["refetch"];
};

export const UserSettingContext = createContext<UserSettingContextType | undefined>(undefined);

export const UserSettingProvider = ({ children }: { children: ReactNode }) => {
  const { data, refetch } = useUserSetting();
  const [selectedChain, setSelectedChain] = useState<SupportChain>("base");

  const defaultWallet = useMemo(() => {
    if (!data) return undefined;
    return data.defaultWallet ?? null;
  }, [data]);

  useEffect(() => {
    if (!!data) setSelectedChain(data.selectedChain);
  }, [data]);

  return (
    <UserSettingContext.Provider
      value={{
        selectedChain,
        defaultWallet,
        refetch
      }}
    >
      {children}
    </UserSettingContext.Provider>
  );
};

export const useUserSettingContext = () => {
  const ctx = useContext(UserSettingContext);
  if (!ctx) throw new Error("UserSettingProvider is not mounted. Wrap your component with <UserSettingProvider>.");
  return ctx;
};
