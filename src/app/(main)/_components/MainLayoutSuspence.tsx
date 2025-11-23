import { ReactNode } from "react";

import { WalletMetaModel } from "@/domain/walletMeta";
import Loading from "@/presentation/components/Loading";
import Maintenance from "@/presentation/components/Maintenance";

type MainLayoutSuspenceProps = {
  meta: WalletMetaModel | undefined;
  isError: boolean;
  children: (meta: WalletMetaModel) => ReactNode;
};

const MainLayoutSuspence = (props: MainLayoutSuspenceProps) => {
  const { meta, isError, children } = props;

  if (!meta && isError) return <Maintenance />;

  if (!meta) return <Loading />;

  return children(meta);
};

export default MainLayoutSuspence;
