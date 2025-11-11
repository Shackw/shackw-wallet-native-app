import { Redirect } from "expo-router";

import Loading from "@/presentation/components/Loading";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";

const AppIndex = () => {
  const { account, hasPrivateKey } = useShackwWalletContext();

  const isLoading = !account && hasPrivateKey;
  const hasWallet = !!account && !!hasPrivateKey;

  if (isLoading) return <Loading />;

  if (!hasWallet) return <Redirect href="/(onbording)" />;

  return <Redirect href="/(main)/(tabs)" />;
};

export default AppIndex;
