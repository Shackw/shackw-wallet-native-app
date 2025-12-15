import { WalletKit, IWalletKit } from "@reown/walletkit";
import { Core } from "@walletconnect/core";
import { getSdkError } from "@walletconnect/utils";
import * as v from "valibot";
import { Address } from "viem";

import { IWalletConnectHandlers } from "@/application/ports/IWalletConnectHandlers";
import { ENV } from "@/config/env";
import { buildApprovedNamespacesForShackw, WALLETCONNECT_METADATA } from "@/config/walletConnect";
import { CustomError } from "@/shared/exceptions";
import { ShackwAuthorizeTransferParamsSchema } from "@/shared/validations/schemas/ShackwAuthorizeTransferParamsSchema";
import { ShackwSignInParamsSchema } from "@/shared/validations/schemas/ShackwSignInParamsSchema";

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
      console.error(e);
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

      const { topic, params, id } = event;
      const { request } = params;
      const { method } = request;

      try {
        switch (method) {
          case "shackw_signIn": {
            const raw = request.params?.[0];

            const parsed = v.safeParse(ShackwSignInParamsSchema, raw);
            if (!parsed.success) {
              await this.walletKit.respondSessionRequest({
                topic,
                response: {
                  id,
                  jsonrpc: "2.0",
                  error: {
                    code: -32000,
                    message: "Invalid shackw_signIn params"
                  }
                }
              });
              return;
            }

            const { message, nonce } = parsed.output;

            const result = await this.handlers.onSignIn({
              topic,
              message,
              nonce
            });

            await this.walletKit.respondSessionRequest({
              topic,
              response: {
                id,
                jsonrpc: "2.0",
                result
              }
            });
            return;
          }

          case "shackw_getAccount": {
            const info = await this.handlers.onGetAccount({ topic });

            await this.walletKit.respondSessionRequest({
              topic,
              response: {
                id,
                jsonrpc: "2.0",
                result: info
              }
            });
            return;
          }

          case "shackw_authorizeTransfer": {
            const raw = request.params?.[0];

            const parsed = v.safeParse(ShackwAuthorizeTransferParamsSchema, raw);
            if (!parsed.success) {
              await this.walletKit.respondSessionRequest({
                topic,
                response: {
                  id,
                  jsonrpc: "2.0",
                  error: {
                    code: -32000,
                    message: "Invalid shackw_authorizeTransfer params"
                  }
                }
              });
              return;
            }

            const p = parsed.output;
            const result = await this.handlers.onAuthorizeTransfer({
              topic,
              chain: p.chain,
              token: p.token,
              feeToken: p.feeToken,
              recipient: p.recipient,
              amountDisplayValue: p.amountDisplayValue,
              delegate: p.delegate,
              quoteToken: p.quoteToken
            });

            if (!result.approved || !result.txHash) {
              await this.walletKit.respondSessionRequest({
                topic,
                response: {
                  id,
                  jsonrpc: "2.0",
                  error: getSdkError("USER_REJECTED")
                }
              });
              return;
            }

            await this.walletKit.respondSessionRequest({
              topic,
              response: {
                id,
                jsonrpc: "2.0",
                result: { txHash: result.txHash }
              }
            });
            return;
          }

          default: {
            await this.walletKit.respondSessionRequest({
              topic,
              response: {
                id,
                jsonrpc: "2.0",
                error: getSdkError("INVALID_METHOD")
              }
            });
            return;
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unexpected error";

        await this.walletKit.respondSessionRequest({
          topic,
          response: {
            id,
            jsonrpc: "2.0",
            error: {
              code: -32000,
              message: msg
            }
          }
        });
      }
    });

    this.walletKit.on("session_delete", async event => {
      if (!this.handlers) return;
      await this.handlers.onSessionDelete(event);
    });
  }
}
