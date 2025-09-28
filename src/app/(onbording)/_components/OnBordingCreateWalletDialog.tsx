import { useCallback, useState } from "react";

import BackDrop from "@/components/BackDrop";
import { ActionDialog } from "@/components/Dialog";
import { ErrorText, InfoText } from "@/components/Text";
import { useBoolean } from "@/hooks/useBoolean";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type OnBordingCreateWalletDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const OnBordingCreateWalletDialog = (props: OnBordingCreateWalletDialogProps) => {
  const { isOpen, handleClose } = props;
  const { createHinomaruWallet } = useHinomaruWalletContext();

  const [isCreating, setIsCreating] = useBoolean(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleCreate = useCallback(async () => {
    try {
      setIsCreating.on();
      await createHinomaruWallet();
    } catch (error) {
      setIsCreating.off();
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
      setError("ウォレットの新規作成中に不明なエラーが発生しました。");
    }
  }, [createHinomaruWallet, setIsCreating]);

  return (
    <>
      <BackDrop visible={isCreating} />
      <ActionDialog
        title="ウォレットの新規作成"
        isOpen={isOpen}
        onClose={handleClose}
        size="lg"
        buttonProps={{ text: "作成", isLoading: isCreating, onPress: handleCreate }}
      >
        <VStack className="py-4 gap-y-1">
          {!error ? (
            <InfoText className="flex-1">すでにウォレットをお持ちの方は「復元」をご利用ください</InfoText>
          ) : (
            <ErrorText className="flex-1">{error}</ErrorText>
          )}
        </VStack>
      </ActionDialog>
    </>
  );
};

export default OnBordingCreateWalletDialog;
