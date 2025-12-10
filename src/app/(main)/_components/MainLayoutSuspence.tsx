import { ReactNode, useEffect } from "react";

import { ShackwApiMetaModel } from "@/domain/shackwApiMeta";
import MaintenanceOverlay from "@/presentation/components/Maintenance";
import { useLoadingOverlay } from "@/presentation/providers/LoadingOverlayProvider";

type MainLayoutSuspenceProps = {
  meta: ShackwApiMetaModel | undefined;
  isError: boolean;
  children: (meta: ShackwApiMetaModel) => ReactNode;
};

const MainLayoutSuspence = (props: MainLayoutSuspenceProps) => {
  const { meta, isError, children } = props;

  const { show, hide } = useLoadingOverlay();
  const isLoading = !meta && !isError;

  useEffect(() => {
    if (isLoading) show();
    else hide();
  }, [isLoading, show, hide]);

  if (!meta && isError) return <MaintenanceOverlay />;

  if (!meta) return null;

  return children(meta);
};

export default MainLayoutSuspence;
