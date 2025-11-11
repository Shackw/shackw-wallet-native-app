import { useMemo } from "react";
import { Address } from "viem";

import { useListMyAddresses } from "@/presentation/hooks/queries/useListMyAddresses";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { shortenAddress } from "@/shared/helpers/address";

export type AddressOption = {
  label: string;
  value: Address;
};

const useMyAddressOptions = () => {
  const { account } = useShackwWalletContext();
  const { data: addresses, ...rest } = useListMyAddresses();

  const addressOptions: AddressOption[] | undefined = useMemo(() => {
    if (!addresses) return undefined;

    return addresses.map(a => ({
      label: `${a.name} - ${shortenAddress(a.address)}`,
      value: a.address
    }));
  }, [addresses]);

  const initialValue: AddressOption | null | undefined = useMemo(() => {
    if (!account || !addressOptions) return undefined;

    const found = addressOptions.find(a => a.value === account.address);
    if (!found) return null;

    return found;
  }, [account, addressOptions]);

  return { initialValue, addressOptions, ...rest };
};

export default useMyAddressOptions;
