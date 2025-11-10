import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { AddressesService } from "@/application/services/AddressesService";
import { AddressModel } from "@/domain/address";
import { SqlAddressesRepository } from "@/infrastructure/sql/SqlAddressesRepository";

export const useListMyAddresses = (
  options?: Partial<UseQueryOptions<AddressModel[]>>
): UseQueryResult<AddressModel[]> => {
  const db = useSQLiteContext();

  return useQuery({
    ...options,
    queryKey: ["ListMyAddresses"],
    queryFn: () => {
      const addressesRepository = new SqlAddressesRepository(db);
      return AddressesService.listMyAddress(addressesRepository);
    }
  });
};
