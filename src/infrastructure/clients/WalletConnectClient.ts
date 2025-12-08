import { WalletKit, IWalletKit } from "@reown/walletkit";
import { Core } from "@walletconnect/core";
import { getSdkError } from "@walletconnect/utils";
import { Address } from "viem";

import { IWalletConnectHandlers } from "@/application/ports/IWalletConnectHandlers";
import { ENV } from "@/config/env";
import { buildApprovedNamespacesForShackw, WALLETCONNECT_METADATA } from "@/config/walletConnect";
import { CustomError } from "@/shared/exceptions";

const PROJECT_ID = ENV.WALLETCONNECT_PROJECT_ID;

export class WalletConnectClient {
  private wallet: Address;
  private handlers: IWalletConnectHandlers;

  private walletKit: IWalletKit;
  private clientId: string;

  private constructor(walletKit: IWalletKit, clientId: string, wallet: Address, handlers: IWalletConnectHandlers) {
    this.walletKit = walletKit;
    this.clientId = clientId;
    this.wallet = wallet;
    this.handlers = handlers;

    this.setupListeners();
  }

  static async create(wallet: Address, handlers: IWalletConnectHandlers): Promise<WalletConnectClient> {
    try {
      const core = new Core({ projectId: PROJECT_ID });

      const walletKit = await WalletKit.init({
        core,
        metadata: WALLETCONNECT_METADATA
      });

      const clientId = await walletKit.engine.signClient.core.crypto.getClientId();

      return new WalletConnectClient(walletKit, clientId, wallet, handlers);
    } catch (e) {
      throw new CustomError("WalletConnect の初期化に失敗しました。", { cause: e });
    }
  }

  updateContext(wallet: Address, handlers: IWalletConnectHandlers) {
    this.wallet = wallet;
    this.handlers = handlers;
  }

  getClientId(): string {
    return this.clientId;
  }

  getRawClient(): IWalletKit {
    return this.walletKit;
  }

  async handleWalletConnectUri(uri: string): Promise<void> {
    try {
      await this.walletKit.pair({ uri });
    } catch (e) {
      throw new CustomError("WalletConnect の接続に失敗しました。", { cause: e });
    }
  }

  async disconnect(topic: string): Promise<void> {
    try {
      await this.walletKit.disconnectSession({
        topic,
        reason: getSdkError("USER_DISCONNECTED")
      });
    } catch (e) {
      throw new CustomError("WalletConnect セッションの切断に失敗しました。", { cause: e });
    }
  }

  private setupListeners() {
    this.walletKit.on("session_proposal", async proposal => {
      if (!this.handlers) return;

      const action = await this.handlers.onSessionProposal(proposal);

      if (action === "approve") {
        const namespaces = buildApprovedNamespacesForShackw(proposal.params, this.wallet);
        await this.walletKit.approveSession({
          id: proposal.id,
          namespaces
        });
      } else {
        await this.walletKit.rejectSession({
          id: proposal.id,
          reason: getSdkError("USER_REJECTED")
        });
      }
    });

    this.walletKit.on("session_request", async event => {
      if (!this.handlers) return;
      await this.handlers.onSessionRequest(event);
    });

    this.walletKit.on("session_delete", async event => {
      if (!this.handlers) return;
      await this.handlers.onSessionDelete(event);
    });
  }
}
