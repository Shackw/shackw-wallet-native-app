import { ContainButton, OutlineButton } from "@/presentation/components/Button";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useBoolean } from "@/presentation/hooks/useBoolean";

import OnBordingCreateWalletDialog from "./OnBordingCreateWalletDialog";
import OnBordingRestoreWalletField from "./OnBordingRestoreWalletField";

const OnBordingActions = () => {
  const [isCreating, setIsCreating] = useBoolean(false);
  const [isRestoring, setIsRestoring] = useBoolean(false);

  return (
    <>
      <VStack className="w-full mt-auto px-16 py-4 gap-y-5">
        <ContainButton text="新規作成" size="lg" onPress={setIsCreating.on} />
        <OutlineButton text="復元" size="lg" onPress={setIsRestoring.on} />
      </VStack>
      <OnBordingCreateWalletDialog isOpen={isCreating} handleClose={setIsCreating.off} />
      <OnBordingRestoreWalletField
        title="秘密鍵からの復元"
        size="lg"
        isOpen={isRestoring}
        onClose={setIsRestoring.off}
      />
    </>
  );
};

export default OnBordingActions;
