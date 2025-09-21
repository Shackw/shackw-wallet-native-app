import { subMonths } from "date-fns";
import { Address } from "viem";

import { formatUnixTimestampToJST } from "@/helpers/datetime";
import { toDecimals } from "@/helpers/tokenUnits";
import { GetLastTransactionCommand, ListTransactionsByTermCommand, TransactionModel } from "@/models/transaction";
import { ADDRESS_TO_TOKEN, TOKENS } from "@/registries/TokenRegistry";
import { RpcTransactionsRepository } from "@/repositories/TransactionsRepository";
import { RpcTransactionModel, SearchRpcTransactionPayload } from "@/repositories/TransactionsRepository/interface";

export const TransactionsService = {
  async getLastTransaction(command: GetLastTransactionCommand): Promise<TransactionModel | null> {
    const { wallet } = command;
    const payload: SearchRpcTransactionPayload = {
      wallet,
      timeFrom: subMonths(new Date(), 3),
      tokens: [...TOKENS.map(token => ({ symbol: token }))],
      limit: 1
    };
    try {
      const searched = await RpcTransactionsRepository.search(payload);
      if (searched.length === 0) return null;
      return rpcModelToAppModel(wallet, searched[0]);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(`getLastTransaction error: ${error.message}`, { cause: error });
      }
      throw new Error(`getLastTransaction unknown error: ${String(error)}`);
    }
  },

  async listTransactionsByTerm(command: ListTransactionsByTermCommand): Promise<TransactionModel[]> {
    const { wallet, token, timeFrom, timeTo } = command;
    const payload: SearchRpcTransactionPayload = {
      wallet,
      tokens: [{ symbol: token }],
      timeFrom,
      timeTo
    };
    try {
      const searched = await RpcTransactionsRepository.search(payload);
      const mapped = searched.map(v => rpcModelToAppModel(wallet, v));
      return mapped;
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(`listTransactionsByTerm error: ${error.message}`, { cause: error });
      }
      throw new Error(`listTransactionsByTerm unknown error: ${String(error)}`);
    }
  }
};

function rpcModelToAppModel(wallet: Address, rpcModel: RpcTransactionModel): TransactionModel {
  const token = ADDRESS_TO_TOKEN[rpcModel.token.toLowerCase()];

  const [direction, counterpartyAddress]: [TransactionModel["direction"], Address] = (() => {
    if (rpcModel.from === wallet && rpcModel.to !== wallet) return ["out", rpcModel.to];
    else if (rpcModel.from !== wallet && rpcModel.to === wallet) return ["in", rpcModel.from];
    return ["self", wallet];
  })();

  return {
    txHash: rpcModel.txHash,
    blockNumber: rpcModel.blockNumber,
    logIndex: rpcModel.logIndex,
    token,
    direction,
    value: {
      minUnits: rpcModel.value,
      decimals: toDecimals(rpcModel.value, token)
    },
    counterparty: {
      address: counterpartyAddress
    },
    transferedAt: formatUnixTimestampToJST(rpcModel.timestamp)
  };
}
