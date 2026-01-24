import { createContext, useContext, useEffect } from "react";

import type { IAddressesRepository } from "@/application/ports/IAddressesRepository";
import type { ILocalTransactionsRepository } from "@/application/ports/ILocalTransactionsRepository";
import type { IPrivateKeyRepository } from "@/application/ports/IPrivateKeyRepository";
import type { IQuotesGateway } from "@/application/ports/IQuotesGateway";
import type { IRemoteTransactionsGateway } from "@/application/ports/IRemoteTransactionsGateway";
import type { ITokensGateway } from "@/application/ports/ITokensGateway";
import type { IUserSettingRepository } from "@/application/ports/IUserSettingRepository";
import type { IWalletMetaGateway } from "@/application/ports/IWalletMetaGateway";

import { MaintenanceOverlay } from "../components/Maintenance";
import { useInfrastructureRepositories } from "../hooks/useInfrastructureRepositories";
import { useLoadingOverlay } from "../providers/LoadingOverlayProvider";

import type { ReactNode } from "react";

export type Dependencies = {
  addressesRepository: IAddressesRepository;
  transactionsRepository: ILocalTransactionsRepository;
  userSettingRepository: IUserSettingRepository;
  quotesGateway: IQuotesGateway;
  transactionsGateway: IRemoteTransactionsGateway;
  tokensGateway: ITokensGateway;
  walletMetaGateway: IWalletMetaGateway;
  privateKeyRepository: IPrivateKeyRepository;
};

type DependenciesContainerProviderProps = {
  appCheckToken: string;
  children: ReactNode;
};

const DependenciesContainerContext = createContext<Dependencies | undefined>(undefined);

export const DependenciesContainerProvider = (props: DependenciesContainerProviderProps) => {
  const { appCheckToken, children } = props;

  const { show, hide } = useLoadingOverlay();
  const { privateKeyRepository, ...rest } = useInfrastructureRepositories(appCheckToken);

  useEffect(() => {
    if (privateKeyRepository === undefined) show();
    else hide();
  }, [privateKeyRepository, show, hide]);

  if (privateKeyRepository === null)
    return <MaintenanceOverlay text={`セキュアストアへのアクセスが拒否されました。\nアプリを再起動してください。`} />;

  if (privateKeyRepository === undefined) return null;

  return (
    <DependenciesContainerContext.Provider value={{ ...rest, privateKeyRepository }}>
      {children}
    </DependenciesContainerContext.Provider>
  );
};

export const useDependenciesContainerContext = () => {
  const ctx = useContext(DependenciesContainerContext);
  if (!ctx)
    throw new Error(
      "DependenciesContainerProvider is not mounted. Wrap your component with <DependenciesContainerProvider>."
    );
  return ctx;
};
