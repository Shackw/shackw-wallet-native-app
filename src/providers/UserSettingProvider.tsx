import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { Address } from "viem";

import { SupportChain } from "@/configs/chain";
import { useUserSetting } from "@/hooks/queries/useUserSetting";

type UserSettingContextType = {
  currentChain: SupportChain;
  defaultChain: SupportChain | undefined;
  defaultWallet: Address | null | undefined;
  setCurrentChain: React.Dispatch<React.SetStateAction<SupportChain>>;
  refetch: ReturnType<typeof useUserSetting>["refetch"];
};

export const UserSettingContext = createContext<UserSettingContextType | undefined>(undefined);

export const UserSettingProvider = ({ children }: PropsWithChildren) => {
  const { data, refetch } = useUserSetting();
  const [currentChain, setCurrentChain] = useState<SupportChain>("base");

  const defaultChain = useMemo(() => {
    if (!data) return undefined;
    return data.defaultChain;
  }, [data]);

  const defaultWallet = useMemo(() => {
    if (!data) return undefined;
    return data.defaultWallet;
  }, [data]);

  useEffect(() => {
    if (!!data) setCurrentChain(data.defaultChain);
  }, [data]);

  return (
    <UserSettingContext.Provider
      value={{
        currentChain,
        defaultChain,
        defaultWallet,
        setCurrentChain,
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
