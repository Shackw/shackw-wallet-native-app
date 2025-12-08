import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useMemo, useState } from "react";

import { IAddressesRepository } from "@/application/ports/IAddressesRepository";
import { ILocalTransactionsRepository } from "@/application/ports/ILocalTransactionsRepository";
import { IPrivateKeyRepository } from "@/application/ports/IPrivateKeyRepository";
import { IQuotesGateway } from "@/application/ports/IQuotesGateway";
import { IRemoteTransactionsGateway } from "@/application/ports/IRemoteTransactionsGateway";
import { ITokensGateway } from "@/application/ports/ITokensGateway";
import { IUserSettingRepository } from "@/application/ports/IUserSettingRepository";
import { IWalletMetaGateway } from "@/application/ports/IWalletMetaGateway";
import { ENV } from "@/config/env";
import { RestClient } from "@/infrastructure/clients/RestClient";
import { HttpQuotesGateway } from "@/infrastructure/http/HttpQuotesGateway";
import { HttpRemoteTransactionsGateway } from "@/infrastructure/http/HttpRemoteTransactionsGateway";
import { HttpTokensGateway } from "@/infrastructure/http/HttpTokensGateway";
import { HttpWalletMetaGateway } from "@/infrastructure/http/HttpWalletMetaGateway";
import { SecureStorePrivateKeyRepository } from "@/infrastructure/secureStore/SecureStorePrivateKeyRepository";
import { SqlAddressesRepository } from "@/infrastructure/sql/SqlAddressesRepository";
import { SqlLocalTransactionsRepository } from "@/infrastructure/sql/SqlLocalTransactionsRepository";
import { SqlUserSettingRepository } from "@/infrastructure/sql/SqlUserSettingRepository";

export type UseInfrastructureRepositoriesResult = {
  addressesRepository: IAddressesRepository;
  transactionsRepository: ILocalTransactionsRepository;
  userSettingRepository: IUserSettingRepository;
  quotesGateway: IQuotesGateway;
  transactionsGateway: IRemoteTransactionsGateway;
  tokensGateway: ITokensGateway;
  walletMetaGateway: IWalletMetaGateway;
  privateKeyRepository: IPrivateKeyRepository | null | undefined;
};

export const useInfrastructureRepositories = (appCheckToken: string): UseInfrastructureRepositoriesResult => {
  const db = useSQLiteContext();
  const [privateKeyRepository, setPrivateKeyRepository] = useState<IPrivateKeyRepository | null | undefined>(undefined);

  const addressesRepository = useMemo(() => new SqlAddressesRepository(db), [db]);
  const transactionsRepository = useMemo(() => new SqlLocalTransactionsRepository(db), [db]);
  const userSettingRepository = useMemo(() => new SqlUserSettingRepository(db), [db]);

  const shackwApiClient = useMemo(
    () =>
      new RestClient({
        baseURL: ENV.SHACKW_API_URL,
        timeoutMs: 60_000,
        headers: { "X-App-Check-Token": appCheckToken }
      }),
    [appCheckToken]
  );
  const quotesGateway = useMemo(() => new HttpQuotesGateway(shackwApiClient), [shackwApiClient]);
  const transactionsGateway = useMemo(() => new HttpRemoteTransactionsGateway(shackwApiClient), [shackwApiClient]);
  const tokensGateway = useMemo(() => new HttpTokensGateway(shackwApiClient), [shackwApiClient]);
  const walletMetaGateway = useMemo(() => new HttpWalletMetaGateway(shackwApiClient), [shackwApiClient]);

  useEffect(() => {
    const init = async () => {
      try {
        const privateKeyRepository = await SecureStorePrivateKeyRepository.getInstance();
        setPrivateKeyRepository(privateKeyRepository);
      } catch {
        setPrivateKeyRepository(null);
      }
    };

    init();
  }, []);

  return {
    addressesRepository,
    transactionsRepository,
    userSettingRepository,
    quotesGateway,
    transactionsGateway,
    tokensGateway,
    walletMetaGateway,
    privateKeyRepository
  };
};
