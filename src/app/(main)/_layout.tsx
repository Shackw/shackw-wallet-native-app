import { useGetWalletMeta } from "@/presentation/hooks/queries/useGetWalletMeta";

import MainLayoutSuspence from "./_components/MainLayoutSuspence";
import MainRoot from "./_components/MainRoot";

const MainLayout = () => {
  const { data: walletMeta, error } = useGetWalletMeta();

  return (
    <MainLayoutSuspence meta={walletMeta} isError={!!error}>
      {meta => <MainRoot meta={meta} />}
    </MainLayoutSuspence>
  );
};

export default MainLayout;
