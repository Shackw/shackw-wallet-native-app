import { useMemo, useState } from "react";

import { useListAddresses } from "@/hooks/queries/useListAddresses";
import { AddressModel } from "@/models/address";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";

export type AddressRow = Pick<AddressModel, "address" | "name">;
export type AddressRows = AddressRow[] | undefined;

const useAddressesRow = () => {
  const { account } = useHinomaruWalletContext();
  const { data: addresses, ...rest } = useListAddresses();
  const [searchText, setSearchText] = useState<string>("");

  const mineRow: AddressRow = useMemo(() => {
    const mine = addresses && addresses.find(a => a.isMine);

    if (!mine) {
      return { address: account?.address ?? "0x", name: "Mine" };
    }

    return { address: mine.address, name: mine.name };
  }, [account, addresses]);

  const addressRows: AddressRows = useMemo(() => {
    if (!addresses) return undefined;

    const excludedMine = addresses.filter(a => !a.isMine).map(a => ({ address: a.address, name: a.name }));

    if (!searchText) return excludedMine;

    const searchParams = String(searchText)
      .split(/\p{White_Space}+/u)
      .filter(Boolean);
    const searched = excludedMine.filter(a => searchParams.some(s => a.name.includes(s) || a.address.includes(s)));

    return searched;
  }, [addresses, searchText]);

  return { mineRow, addressRows, searchText, setSearchText, ...rest };
};

export default useAddressesRow;
