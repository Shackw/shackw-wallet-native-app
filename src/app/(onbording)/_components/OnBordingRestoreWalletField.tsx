import { useCallback } from "react";

import { BottomInputDrawer } from "@/components/Drawer";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";

import OnBordingInputPkForm from "./OnBordingInputPkForm";

type OnBordingRestoreWalletFieldProps = Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;

const OnBordingRestoreWalletField = (props: OnBordingRestoreWalletFieldProps) => {
  const { restoreWallet } = useHinomaruWalletContext();

  const onRestore = useCallback(
    async (pk: string) => {
      await restoreWallet(pk);
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
