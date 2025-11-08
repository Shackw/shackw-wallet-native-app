import { useCallback, useState } from "react";

import BackDrop from "@/presentation/components/BackDrop";
import { ActionDialog } from "@/presentation/components/Dialog";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useHinomaruWalletContext } from "@/presentation/providers/HinomaruWalletProvider";

type OnBordingCreateWalletDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const OnBordingCreateWalletDialog = (props: OnBordingCreateWalletDialogProps) => {
  const { isOpen, handleClose } = props;
  const { createWallet } = useHinomaruWalletContext();

  const [isCreating, setIsCreating] = useBoolean(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleCreate = useCallback(async () => {
    try {
      setIsCreating.on();
      await createWallet("Mine");
    } catch (error) {
      setIsCreating.off();
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
      setError("ウォレットの新規作成中に不明なエラーが発生しました。");
    }
  }, [createWallet, setIsCreating]);

  return (
    <>
      <BackDrop visible={isCreating} />
      <ActionDialog
        title="ウォレットの新規作成"
        action="primary"
        isOpen={isOpen}
        onClose={handleClose}
        size="lg"
        buttonProps={{ text: "作成", isLoading: isCreating, onPress: handleCreate }}
      >
        <VStack className="py-4 gap-y-1">
          {!error ? (
            <InfoText>すでにウォレットをお持ちの方は「復元」をご利用ください</InfoText>
          ) : (
            <ErrorText>{error}</ErrorText>
          )}
        </VStack>
      </ActionDialog>
    </>
  );
};

export default OnBordingCreateWalletDialog;
