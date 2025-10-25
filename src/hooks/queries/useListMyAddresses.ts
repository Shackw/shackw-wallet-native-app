import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { AddressModel } from "@/models/address";
import { AddressesService } from "@/services/AddressesService";

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
