import { createContext, ReactNode, useContext, useEffect } from "react";

import { IAddressesRepository } from "@/application/ports/IAddressesRepository";
import { ILocalTransactionsRepository } from "@/application/ports/ILocalTransactionsRepository";
import { IPrivateKeyRepository } from "@/application/ports/IPrivateKeyRepository";
import { IQuotesGateway } from "@/application/ports/IQuotesGateway";
import { IRemoteTransactionsGateway } from "@/application/ports/IRemoteTransactionsGateway";
import { ITokensGateway } from "@/application/ports/ITokensGateway";
import { IUserSettingRepository } from "@/application/ports/IUserSettingRepository";
import { IWalletMetaGateway } from "@/application/ports/IWalletMetaGateway";

import { useInfrastructureRepositories } from "../hooks/useInfrastructureRepositories";
import { useLoadingOverlay } from "../providers/LoadingOverlayProvider";

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

  const { privateKeyRepository, ...rest } = useInfrastructureRepositories(appCheckToken);
  const { show, hide } = useLoadingOverlay();

  useEffect(() => {
    if (!privateKeyRepository) {
      show();
    } else {
      hide();
    }
  }, [privateKeyRepository, show, hide]);

  if (!privateKeyRepository) return null;

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
