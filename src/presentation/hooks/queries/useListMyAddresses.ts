import { useQuery } from "@tanstack/react-query";

import { AddressesService } from "@/application/services/AddressesService";
import type { AddressModel } from "@/domain/address";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export const useListMyAddresses = (
  options?: Partial<UseQueryOptions<AddressModel[]>>
): UseQueryResult<AddressModel[]> => {
  const { addressesRepository } = useDependenciesContainerContext();

  return useQuery({
    ...options,
    queryKey: ["ListMyAddresses"],
    queryFn: () => AddressesService.listMyAddress(addressesRepository)
  });
};
