import { useCallback } from "react";

import { BottomInputDrawer } from "@/presentation/components/Drawer";

import RestoreWalletFieldForm from "./RestoreWalletFieldForm";

type RestoreWalletFieldProps = {
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
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
    <BottomInputDrawer {...componentProps}>
      <RestoreWalletFieldForm onClose={componentProps.onClose} onRestore={onRestore} />
    </BottomInputDrawer>
  );
};

export default RestoreWalletField;
