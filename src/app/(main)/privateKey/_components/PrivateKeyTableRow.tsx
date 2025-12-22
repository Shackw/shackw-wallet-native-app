import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { Pressable } from "react-native";

import { ListPrivateKeysCommand } from "@/domain/privateKey";
import BackDrop from "@/presentation/components/BackDrop";
import { ActionDialog, AlertDialog } from "@/presentation/components/Dialog";
import { TableRow } from "@/presentation/components/gluestack-ui/table";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { InfoText, ErrorText } from "@/presentation/components/Text";
import { useDeletePrivateKey } from "@/presentation/hooks/mutations/useDeletePrivateKey";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import PrivateKeyConfirmSheet from "@mainc/PrivateKeyConfirmSheet";

import { PrivateKeyRows } from "./PrivateKeyScreenSuspence";

type PrivateKeyTableRowProps = {
  row: PrivateKeyRows;
  index: number;
  fetchPrivateKeys: (variables: ListPrivateKeysCommand) => Promise<void>;
};

const PrivateKeyTableRow = (props: PrivateKeyTableRowProps) => {
  const { row, index, fetchPrivateKeys } = props;

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
          className={`w-full px-3 py-2 active:bg-secondary-100 ${index % 2 === 0 ? "bg-secondary-50" : ""}`}
          onLongPress={setIsDisplaying.on}
        >
          <VStack className="gap-y-1">
            <Text className="font-bold text-secondary-500">{row.createdAtStr}</Text>
            <Text className="font-bold pl-2" size="lg">
              {row.name}
            </Text>
            <Text className="pl-2" numberOfLines={1} ellipsizeMode="middle" size="lg">
              {row.wallet}
            </Text>
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
        <VStack className="py-4 gap-y-2">
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
        <VStack className="py-4 gap-y-1">
          <ErrorText>{errorMes}</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default PrivateKeyTableRow;
