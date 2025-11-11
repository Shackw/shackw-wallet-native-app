import { useCallback } from "react";

import { BottomInputDrawer } from "@/presentation/components/Drawer";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";

import OnBordingInputPkForm from "./OnBordingInputPkForm";

type OnBordingRestoreWalletFieldProps = Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;

const OnBordingRestoreWalletField = (props: OnBordingRestoreWalletFieldProps) => {
  const { restoreWallet } = useShackwWalletContext();

  const onRestore = useCallback(
    async (pk: string) => {
      await restoreWallet("Mine", pk);
    },
    [restoreWallet]
  );

  return (
    <BottomInputDrawer {...props}>
      <OnBordingInputPkForm onClose={props.onClose} onRestore={onRestore} />
    </BottomInputDrawer>
  );
};

export default OnBordingRestoreWalletField;
