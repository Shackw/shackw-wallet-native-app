import { useCallback } from "react";

import { BottomInputDrawer } from "@/presentation/components/Drawer";

import RestoreWalletFieldForm from "./RestoreWalletFieldForm";

type RestoreWalletFieldProps = {
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
  restoreWallet: (name: string, pk: string) => Promise<void>;
};

const RestoreWalletField = (props: RestoreWalletFieldProps) => {
  const { componentProps, restoreWallet } = props;

  const onRestore = useCallback(
    async (pk: string) => {
      await restoreWallet("Mine", pk);
    },
    [restoreWallet]
  );

  return (
    <BottomInputDrawer {...componentProps}>
      <RestoreWalletFieldForm onClose={componentProps.onClose} onRestore={onRestore} />
    </BottomInputDrawer>
  );
};

export default RestoreWalletField;
