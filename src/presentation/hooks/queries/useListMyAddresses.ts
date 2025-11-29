import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

import { AddressesService } from "@/application/services/AddressesService";
import { AddressModel } from "@/domain/address";
import { useDependenciesContainerContext } from "@/presentation/providers/DependenciesContainerProvider";

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
