import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";

import Loading from "../_loading";

import OnBording from "./_onbording";
import MainRoutes from "./_routes";

const MainLayout = () => {
  const { account, hasPrivateKey, createHinomaruWallet } = useHinomaruWalletContext();

  const isLoading = !account && hasPrivateKey;

  const hasWallet = account && hasPrivateKey;

  if (isLoading) return <Loading />;

  if (!hasWallet) return <OnBording createHinomaruWallet={createHinomaruWallet} />;

  return <MainRoutes />;
};

export default MainLayout;
