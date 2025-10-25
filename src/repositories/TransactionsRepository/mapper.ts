import { TransactionProgressRow, TransactionWithAddressRow } from "@/db/schema";
import { ADDRESS_TO_TOKEN } from "@/registries/TokenRegistry";

import { TransactionProgressResult, ResolvedTransactionResult } from "./interface";

export const transactionWithAddressRowToResult = (dbModel: TransactionWithAddressRow): ResolvedTransactionResult => {
  return {
    txHash: dbModel.tx_hash,
    blockNumber: BigInt(dbModel.block_number),
    logIndex: dbModel.log_index,
    tokenAddress: dbModel.token_address,
    fromAddress: dbModel.from_address,
    toAddress: dbModel.to_address,
    valueMinUnits: BigInt(dbModel.value_min_units),
    transferredUnixAt: dbModel.transferred_at,
    fromName: dbModel.from_name ?? undefined,
    toName: dbModel.to_name ?? undefined
  };
};

export const transactionProgressRowToResult = (dbModel: TransactionProgressRow): TransactionProgressResult => {
  return {
    chain: dbModel.chain,
    year: dbModel.year,
    month: dbModel.month,
    token: ADDRESS_TO_TOKEN[dbModel.token_address.toLowerCase()],
    createdBy: dbModel.created_by_address,
    status: dbModel.status,
    lastUpdatedAt: new Date(dbModel.last_updated_at * 1000)
  };
};
