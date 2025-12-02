import { WalletKit, IWalletKit } from "@reown/walletkit";
import { Core } from "@walletconnect/core";

import { ENV } from "@/config/env";
import { WALLETCONNECT_METADATA } from "@/config/walletConnect";
import { CustomError } from "@/shared/exceptions";

const PROJECT_ID = ENV.WALLETCONNECT_PROJECT_ID;

export class WalletConnectClient {
  private static instance: WalletConnectClient | null = null;
  private static ready: Promise<WalletConnectClient> | null = null;

  private clientId: string | null = null;
  private walletKit: IWalletKit | null = null;

  // ---- Singleton / Init ----
  static async getInstance(): Promise<WalletConnectClient> {
    if (this.instance) return this.instance;

    if (!this.ready) {
      this.ready = (async () => {
        try {
          const inst = new WalletConnectClient();
          await inst.initialize();
          this.instance = inst;
          return inst;
        } catch (e) {
          this.ready = null;
          throw new CustomError("WalletConnectの初期化に失敗しました。", { cause: e });
        }
      })();
    }
    return await this.ready;
  }

  private async initialize(): Promise<void> {
    const core = new Core({ projectId: PROJECT_ID });
    const walletKit = await WalletKit.init({
      core,
      metadata: WALLETCONNECT_METADATA
    });

    const clientId = await walletKit.engine.signClient.core.crypto.getClientId();

    this.setupWalletKitListeners(walletKit);

    this.clientId = clientId;
    this.walletKit = walletKit;
  }

  private setupWalletKitListeners(walletKit: IWalletKit) {
    // イベント購読だけなので async 不要
    // walletKit.on("session_proposal", ...)
    // walletKit.on("session_request", ...)
    // walletKit.on("session_delete", ...)
  }

  // ---- Public API ----
  async handleWalletConnectUri(uri: string) {
    if (!this.walletKit) throw new CustomError("WalletConnectクライアントが初期化されていません。");
    await this.walletKit.pair({ uri });
  }
}
