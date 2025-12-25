import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { Pressable } from "react-native";

import { ListPrivateKeysCommand } from "@/domain/privateKey";
import { AppText } from "@/presentation/components/AppText";
import BackDrop from "@/presentation/components/BackDrop";
import { ActionDialog, AlertDialog } from "@/presentation/components/Dialog";
import { TableRow } from "@/presentation/components/gluestack-ui/table";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { InfoText, ErrorText } from "@/presentation/components/Text";
import { useDeletePrivateKey } from "@/presentation/hooks/mutations/useDeletePrivateKey";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import PrivateKeyConfirmSheet from "@mainc/PrivateKeyConfirmSheet";

import { PrivateKeyRows } from "./PrivateKeyScreenSuspence";

type PrivateKeyTableRowProps = {
  row: PrivateKeyRows;
  index: number;
  fetchPrivateKeys: (variables: ListPrivateKeysCommand) => Promise<void>;
};

const PrivateKeyTableRow = (props: PrivateKeyTableRowProps) => {
  const { row, index, fetchPrivateKeys } = props;

  const tw = useTw();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useBoolean(false);
  const [isDisplaying, setIsDisplaying] = useBoolean(false);

  const { mutateAsync: deletePrivateKey, isPending, error, reset } = useDeletePrivateKey();

  const errorMes = useMemo(() => {
    if (!error) return undefined;
    return `${error.message}\nダイアログを閉じると前の画面に戻ります。`;
  }, [error]);

  const handleDeletePrivateKey = useCallback(async () => {
    try {
      await deletePrivateKey(row.wallet);
      await fetchPrivateKeys({ isAuthRequired: false });
    } finally {
      setIsDeleting.off();
    }
  }, [deletePrivateKey, fetchPrivateKeys, row.wallet, setIsDeleting]);

  const handleCloseErrorDialog = useCallback(() => {
    router.back();
    reset();
  }, [reset, router]);

  return (
    <>
      {isPending && <BackDrop visible />}

      <TableRow className="w-full">
        <Pressable
          className={cn("w-full", tw.px(3), tw.py(2), "active:bg-secondary-100", index % 2 === 0 && "bg-secondary-50")}
          onLongPress={setIsDisplaying.on}
        >
          <VStack className={tw.gapY(1)}>
            <AppText className="font-bold text-secondary-500">{row.createdAtStr}</AppText>
            <AppText t="lg" className={cn("font-bold", tw.pl(2))}>
              {row.name}
            </AppText>
            <AppText t="md" className={tw.pl(2)} oneLine ellipsizeMode="middle">
              {row.wallet}
            </AppText>
          </VStack>
        </Pressable>
      </TableRow>

      <PrivateKeyConfirmSheet
        key={`pk-display:${row.wallet}`}
        mode="display"
        wallet={row.wallet}
        privateKey={row.privateKey}
        createdAtStr={row.createdAtStr}
        onDelete={setIsDeleting.on}
        componentProps={{
          title: "プライベートキーの管理",
          size: "lg",
          isOpen: isDisplaying,
          onClose: setIsDisplaying.off
        }}
      />

      <ActionDialog
        key={`delete:${row.wallet}`}
        title="プライベートキーの削除"
        action="secondary"
        isOpen={isDeleting}
        onClose={setIsDeleting.off}
        size="lg"
        buttonProps={{ text: "削除", isLoading: isPending, onPress: handleDeletePrivateKey }}
      >
        <VStack className={cn(tw.py(4), tw.gapY(2))}>
          <InfoText>{`プライベートキーを削除します。\n削除後は回復することができません。`}</InfoText>
        </VStack>
      </ActionDialog>

      <AlertDialog
        key={`delete-failed:${row.wallet}`}
        title="プライベートキー削除失敗"
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

export default PrivateKeyTableRow;
