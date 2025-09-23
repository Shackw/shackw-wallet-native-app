import { AddressRow } from "@/db/schema";

import { AddressesResult } from "./interface";

export const addressRowToResult = (dbModel: AddressRow): AddressesResult => {
  return {
    ...dbModel,
    isMine: dbModel.is_mine === 1,
    updatedAt: new Date(dbModel.updated_at * 1000),
    createdAt: new Date(dbModel.created_at * 1000)
  };
};
