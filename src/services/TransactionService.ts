import { subMonths } from "date-fns";

import { TOKENS } from "@/configs/token";
import { GetLastTransactionCommand, TransactionModel } from "@/models/transaction";
import { TransactionRepository } from "@/repositories/TransactionRepository";
import { SearchTransactionPayload } from "@/repositories/TransactionRepository/dto";

export const TransactionService = {
  async getLastTransaction(command: GetLastTransactionCommand): Promise<TransactionModel | null> {
    const { wallet } = command;
    const payload: SearchTransactionPayload = {
      wallet,
      timeFrom: subMonths(new Date(), 3),
      tokens: [...TOKENS.map(token => ({ symbol: token }))],
      limit: 1
    };
    try {
      const searched = await TransactionRepository.search(payload);
      return searched[0] ?? null;
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(`getLastTransaction error: ${error.message}`, { cause: error });
      }
      throw new Error(`getLastTransaction unknown error: ${String(error)}`);
    }
  }
};
