import { useCallback, useState } from "react";

import type {
  IWalletConnectHandlers,
  ShackwSignInParams,
  ShackwSignInResult
} from "@/application/ports/IWalletConnectHandlers";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";

type PendingSignIn = {
  params: ShackwSignInParams;
  resolve: (res: ShackwSignInResult) => void;
  reject: (err: Error) => void;
};

export const useWcSignIn = () => {
  const { account, walletClient } = useShackwWalletContext();
  const [pendingSignIn, setPendingSignIn] = useState<PendingSignIn | null>(null);

  const onSignIn = useCallback<IWalletConnectHandlers["onSignIn"]>(async params => {
    return await new Promise<ShackwSignInResult>((resolve, reject) => {
      setPendingSignIn({ params, resolve, reject });
    });
  }, []);

  const onApproveSignIn = useCallback(async () => {
    if (!pendingSignIn) return;
    if (!account || !walletClient) {
      pendingSignIn.reject(new Error("アカウント情報を取得できません。"));
      setPendingSignIn(null);
      return;
    }

    try {
      const { resolve } = pendingSignIn;
      const signature = await walletClient.signMessage({
        account,
        message: pendingSignIn.params.message
      });

      resolve({
        address: account.address,
        signature
      });
    } catch (e) {
      pendingSignIn.reject(e instanceof Error ? e : new Error("サインインの署名に失敗しました。"));
    } finally {
      setPendingSignIn(null);
    }
  }, [account, pendingSignIn, walletClient]);

  const onCancelSignIn = useCallback(() => {
    if (!pendingSignIn) return;

    pendingSignIn.reject(new Error("ユーザーがサインインをキャンセルしました。"));
    setPendingSignIn(null);
  }, [pendingSignIn]);

  return { pendingSignIn, onSignIn, onApproveSignIn, onCancelSignIn };
};
