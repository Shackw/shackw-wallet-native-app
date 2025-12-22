import { useCallback } from "react";
import { Address } from "viem";

import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { useUpdateAddress } from "@/presentation/hooks/mutations/useUpdateAddress";
import { useAddressesRow } from "@/presentation/hooks/useAddressesRow";

import AddressesMineEditForm from "./AddressesMineEditForm";

type AddressesMineEditFieldProps = {
  address: Address;
  name: string;
  componentProps: Omit<React.ComponentProps<typeof BottomActionSheet>, "children">;
  refetchAddresses: ReturnType<typeof useAddressesRow>["refetch"];
};

const AddressesMineEditField = (props: AddressesMineEditFieldProps) => {
  const { address, name, componentProps, refetchAddresses } = props;
  const { mutateAsync: updateAddress } = useUpdateAddress();

  const handleEdit = useCallback(
    async (name: string) => {
      await updateAddress({ address, name });
      await refetchAddresses();
    },
    [address, refetchAddresses, updateAddress]
  );

  return (
    <BottomActionSheet {...componentProps}>
      <AddressesMineEditForm initName={name} onClose={componentProps.onClose} onEdit={handleEdit} />
    </BottomActionSheet>
  );
};

export default AddressesMineEditField;
