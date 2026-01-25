import { useLocalSearchParams } from "expo-router";
import { useRef, useEffect } from "react";

import { useWalletConnectContext } from "@/presentation/providers/WalletConnectProvider";

import WcSessionProposal from "./wc/WcSessionProposal";
import WcSignIn from "./wc/WcSignIn";

const WalletConnectCoordinator = () => {
  const params = useLocalSearchParams<{ wcUri?: string }>();

  const uriRaw = params.wcUri;
  const uri = uriRaw ? decodeURIComponent(uriRaw) : null;

  const pairedRef = useRef(false);
  const { wcClient, sessionProposal, signIn } = useWalletConnectContext();

  const { pendingProposal, onApproveProposal, onRejectProposal } = sessionProposal;
  const { pendingSignIn, onApproveSignIn, onCancelSignIn } = signIn;

  useEffect(() => {
    if (!uri) return;
    if (!wcClient) return;

    if (pairedRef.current) return;
    pairedRef.current = true;

    (async () => {
      try {
        await wcClient.handleWalletConnectUri(uri);
      } catch (e) {
        pairedRef.current = false;
        console.error(e);
      }
    })();
  }, [uri, wcClient]);

  return (
    <>
      <WcSessionProposal
        proposal={pendingProposal?.proposal}
        onApproveProposal={onApproveProposal}
        onRejectProposal={onRejectProposal}
        componentProps={{ title: "Dapp接続確認", size: "lg", isOpen: !!pendingProposal }}
      />

      <WcSignIn
        params={pendingSignIn?.params}
        peerMeta={pendingSignIn?.peerMeta}
        onApproveSignIn={onApproveSignIn}
        onCancelSignIn={onCancelSignIn}
        componentProps={{ title: "Dappサインイン", size: "lg", isOpen: !!pendingSignIn }}
      />
    </>
  );
};

export default WalletConnectCoordinator;
