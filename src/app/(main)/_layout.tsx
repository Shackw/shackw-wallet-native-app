import { useMemo } from "react";

import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";

import Loading from "../_loading";

import OnBording from "./_onbording";
import MainRoutes from "./_routes";

const MainLayout = () => {
  const { eoaAccount, isStoredPrivateKey, createHinomaruWallet } = useHinomaruWalletContext();

  const isLoading = useMemo(() => {
    return !eoaAccount && isStoredPrivateKey;
  }, [eoaAccount, isStoredPrivateKey]);

  const hasWallet = useMemo(() => {
    return eoaAccount && isStoredPrivateKey;
  }, [eoaAccount, isStoredPrivateKey]);

  if (isLoading) return <Loading />;

  if (!hasWallet) return <OnBording createHinomaruWallet={createHinomaruWallet} />;

  return <MainRoutes />;
};

export default MainLayout;
