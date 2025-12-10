import { ComponentProps, useCallback } from "react";

import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";

import RestoreWalletFieldForm from "./RestoreWalletFieldForm";

type RestoreWalletFieldProps = {
  componentProps: Omit<ComponentProps<typeof BottomActionSheet>, "children">;
  onRestoreWallet: (name: string, pk: string) => Promise<void>;
};

const RestoreWalletField = (props: RestoreWalletFieldProps) => {
  const { componentProps, onRestoreWallet } = props;

  const onRestore = useCallback(
    async (pk: string) => {
      await onRestoreWallet("Mine", pk);
    },
    [onRestoreWallet]
  );

  return (
    <BottomActionSheet {...componentProps}>
      <RestoreWalletFieldForm onClose={componentProps.onClose} onRestore={onRestore} />
    </BottomActionSheet>
  );
};

export default RestoreWalletField;
