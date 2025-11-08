import { Redirect } from "expo-router";

import Loading from "@/presentation/components/Loading";
import { useHinomaruWalletContext } from "@/presentation/providers/HinomaruWalletProvider";

const AppIndex = () => {
  const { account, hasPrivateKey } = useHinomaruWalletContext();

  const isLoading = !account && hasPrivateKey;
  const hasWallet = !!account && !!hasPrivateKey;

  if (isLoading) return <Loading />;

  if (!hasWallet) return <Redirect href="/(onbording)" />;

  return <Redirect href="/(main)/(tabs)" />;
};

export default AppIndex;
