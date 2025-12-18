import { Hex } from "viem";

import { IAddressesRepository } from "../ports/IAddressesRepository";
import { IPrivateKeyRepository } from "../ports/IPrivateKeyRepository";
import { IUserSettingRepository } from "../ports/IUserSettingRepository";

export const InitializeWalletUseCase = {
  async execute(
    addressesRepository: IAddressesRepository,
    userSettingRepository: IUserSettingRepository,
    privateKeyRepository: IPrivateKeyRepository
  ): Promise<Hex | null> {
    try {
      // Fetch all persisted states in parallel
      const [sqlMyAddresses, userSetting, storedPrivateKeys] = await Promise.all([
        addressesRepository.listMine(),
        userSettingRepository.get(),
        privateKeyRepository.list()
      ]);

      // =========================================================
      // Synchronize "mine" flags between SQLite and SecureStore
      // =========================================================

      // Wallets that actually exist in SecureStore
      const secureWalletSet = new Set(storedPrivateKeys.map(pk => pk.wallet));

      // Addresses marked as "mine" in SQLite but missing in SecureStore
      const orphanedSqlAddresses = sqlMyAddresses.filter(addr => !secureWalletSet.has(addr.address));

      // Unmark orphaned addresses (SecureStore was deleted)
      await Promise.all(
        orphanedSqlAddresses.map(addr =>
          addressesRepository.update({
            address: addr.address,
            name: addr.name,
            isMine: false
          })
        )
      );

      // =========================================================
      // Restore missing SQLite entries from SecureStore
      // =========================================================

      const sqlAddressSet = new Set(sqlMyAddresses.map(addr => addr.address));

      // Private keys that exist in SecureStore but not in SQLite
      const missingSqlAddresses = storedPrivateKeys.filter(pk => !sqlAddressSet.has(pk.wallet));

      // Recreate missing SQLite records for wallets owned by the user
      await Promise.all(
        missingSqlAddresses.map(pk =>
          addressesRepository.create({
            name: "Mine",
            address: pk.wallet,
            isMine: true
          })
        )
      );

      // =========================================================
      // Resolve default wallet & private key consistency
      // =========================================================

      let defaultPrivateKey: Hex | null = null;
      const configuredDefaultWallet = userSetting?.defaultWallet ?? null;

      if (configuredDefaultWallet) {
        // A default wallet is configured in SQLite
        defaultPrivateKey = storedPrivateKeys.find(pk => pk.wallet === configuredDefaultWallet)?.privateKey ?? null;

        // If the private key is missing from SecureStore, clear the setting
        if (!defaultPrivateKey) {
          await userSettingRepository.patch({ defaultWallet: null });
        }
      }

      // If no default wallet is configured but private keys exist,
      // automatically assign the first available wallet as default
      if (!configuredDefaultWallet && storedPrivateKeys.length > 0) {
        const firstKey = storedPrivateKeys[0];

        defaultPrivateKey = firstKey.privateKey;
        await userSettingRepository.patch({ defaultWallet: firstKey.wallet });
      }

      return defaultPrivateKey;
    } catch (e) {
      console.error(e);
      throw new Error("アプリ起動時のウォレット初期化に失敗しました。");
    }
  }
};
