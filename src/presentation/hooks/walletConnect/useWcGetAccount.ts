import { useCallback } from "react";

import { IWalletConnectHandlers } from "@/application/ports/IWalletConnectHandlers";
import { CHAINS } from "@/config/chain";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

export const useWcGetAccount = () => {
  const { account } = useShackwWalletContext();
  const { currentChain } = useWalletPreferencesContext();

  const onGetAccount = useCallback<IWalletConnectHandlers["onGetAccount"]>(async () => {
    if (!account) throw new Error("Shackw Walletが初期化されていません。");

    return {
      address: account.address,
      chain: {
        id: CHAINS[currentChain].id,
        symbol: currentChain
      }
    };
  }, [account, currentChain]);

  return { onGetAccount };
};
