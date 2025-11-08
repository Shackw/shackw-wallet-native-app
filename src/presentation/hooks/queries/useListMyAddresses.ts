import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { AddressesService } from "@/application/services/AddressesService";
import { AddressModel } from "@/domain/address";

export const useListMyAddresses = (
  options?: Partial<UseQueryOptions<AddressModel[]>>
): UseQueryResult<AddressModel[]> => {
  const db = useSQLiteContext();
  return useQuery({
    ...options,
    queryKey: ["ListMyAddresses"],
    queryFn: () => AddressesService.listMyAddress(db)
  });
};
