import { useCallback, useMemo, useState } from "react";
import { Pressable } from "react-native";
import { Address } from "viem";

import { PrivateKeyModel } from "@/domain/privateKey";
import { AppText } from "@/presentation/components/AppText";
import BackDrop from "@/presentation/components/BackDrop";
import { AlertDialog } from "@/presentation/components/Dialog";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText } from "@/presentation/components/Text";
import { useFetchPrivateKeyByWallet } from "@/presentation/hooks/mutations/useFetchPrivateKeyByWallet";
import { useSafeTransition } from "@/presentation/hooks/useSafeTransition";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import { formatIsoString } from "@/shared/helpers/datetime";
import PrivateKeyConfirmSheet from "@mainc/PrivateKeyConfirmSheet";

type HomePkBackupReminderProps = {
  wallet: Address;
};

const HomePkBackupReminder = (props: HomePkBackupReminderProps) => {
  const { wallet } = props;

  const tw = useTw();

  const { safeTransition } = useSafeTransition();
  const [verifingPk, setVerifingPk] = useState<PrivateKeyModel | undefined>(undefined);
  const { mutateAsync: getPrivateKeyByWallet, isPending, error, reset } = useFetchPrivateKeyByWallet({ retry: 0 });

  const errorMes = useMemo(() => {
    if (!error) return undefined;
    return `${error.message}`;
  }, [error]);

  const handlePressReminder = useCallback(async () => {
    const pk = await getPrivateKeyByWallet({ wallet, isAuthRequired: true });
    setVerifingPk(pk);
  }, [getPrivateKeyByWallet, wallet]);

  const handleVerifingPk = useCallback(() => {
    setVerifingPk(undefined);
    safeTransition(`/privateKey/${wallet}/verify`);
  }, [safeTransition, wallet]);

  const handleCloseConfirmSheet = useCallback(() => {
    setVerifingPk(undefined);
  }, []);

  const handleCloseErrorDialog = useCallback(() => {
    reset();
    setVerifingPk(undefined);
  }, [reset]);

  return (
    <>
      {isPending && <BackDrop visible />}

      <Pressable
        className="absolute w-full rounded-xl bg-secondary-900 border-primary-900 border-2 active:bg-secondary-800"
        onPress={handlePressReminder}
      >
        <HStack className={cn(tw.p(3), tw.gapX(3))}>
          <Box className="w-1 h-full bg-primary-700" />
          <VStack className={cn("w-full", tw.gapY(1))}>
            <AppText t="md" className="text-primary-100 font-bold">{`バックアップ未完了`}</AppText>
            <ErrorText t="sm">{`端末を失うと資産が永久に失われます。\nバックアップ完了まで全機能が制限されます。`}</ErrorText>
          </VStack>
        </HStack>
      </Pressable>

      <PrivateKeyConfirmSheet
        key={`verify:${wallet}`}
        mode="verify"
        wallet={verifingPk?.wallet ?? "0x"}
        privateKey={verifingPk?.privateKey ?? "0x"}
        createdAtStr={formatIsoString(verifingPk?.createdAt ?? new Date())}
        onVerify={handleVerifingPk}
        componentProps={{
          title: "プライベートキーのバックアップ",
          size: "lg",
          isOpen: !!verifingPk,
          onClose: handleCloseConfirmSheet
        }}
      />

      <AlertDialog
        key={`verify-failed:${wallet}`}
        title="プライベートキーの取得失敗"
        isOpen={!!errorMes}
        onClose={handleCloseErrorDialog}
        size="lg"
      >
        <VStack className={cn(tw.py(4), tw.gapY(1))}>
          <ErrorText>{errorMes}</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default HomePkBackupReminder;
