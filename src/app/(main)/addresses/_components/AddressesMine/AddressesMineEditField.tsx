import { useCallback } from "react";
import { Address } from "viem";

import { BottomInputDrawer } from "@/components/Drawer";
import { useUpdateAddress } from "@/hooks/mutations/useUpdateAddress";
import useAddressesRow from "@/hooks/useAddressesRow";

import AddressesMineEditForm from "./AddressesMineEditForm";

type AddressesMineEditFieldProps = {
  address: Address;
  name: string;
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
  refetchAddresses: ReturnType<typeof useAddressesRow>["refetch"];
};

const AddressesMineEditField = (props: AddressesMineEditFieldProps) => {
  const { address, name, componentProps, refetchAddresses } = props;
  const { mutateAsync: updateAddress } = useUpdateAddress();

  const onEdit = useCallback(
    async (name: string) => {
      await updateAddress({ address, name });
      await refetchAddresses();
    },
    [address, refetchAddresses, updateAddress]
  );

  return (
    <BottomInputDrawer {...componentProps}>
      <AddressesMineEditForm initName={name} onClose={componentProps.onClose} onEdit={onEdit} />
    </BottomInputDrawer>
  );
};

export default AddressesMineEditField;
