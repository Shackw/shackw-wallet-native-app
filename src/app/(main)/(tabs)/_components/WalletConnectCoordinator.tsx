import { useSearchParams } from "expo-router/build/hooks";
import { useRef, useEffect } from "react";

import { WcSessionProposal } from "@/presentation/components/WcSessionProposal";
import { useWalletConnectContext } from "@/presentation/providers/WalletConnectProvider";

const WalletConnectCoordinator = () => {
  const searchParams = useSearchParams();
  const uriRaw = searchParams.get("wcUri");
  const uri = uriRaw ? decodeURIComponent(uriRaw) : null;

  const pairedRef = useRef(false);
  const { wcClient, sessionProposal } = useWalletConnectContext();

  const { pendingProposal, onApproveProposal, onRejectProposal } = sessionProposal;

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
        handleApproveProposal={onApproveProposal}
        handleRejectProposal={onRejectProposal}
        componentProps={{ title: "Dapp接続確認", size: "lg", isOpen: !!pendingProposal }}
      />
    </>
  );
};

export default WalletConnectCoordinator;
