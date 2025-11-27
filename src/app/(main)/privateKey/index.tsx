import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ListPrivateKeysCommand, PrivateKeyModel } from "@/domain/privateKey";
import { ScreenContainer } from "@/presentation/components/Container";
import { AlertDialog } from "@/presentation/components/Dialog";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";
import { useListPrivateKeys } from "@/presentation/hooks/mutations/useListPrivateKeys";

import PrivateKeyScreenSuspence from "./_components/PrivateKeyScreenSuspence";
import PrivateKeyTable from "./_components/PrivateKeyTable";

const PrivateKeyScreen = () => {
  const router = useRouter();
  const [privateKeys, setPrivateKeys] = useState<PrivateKeyModel[] | undefined>(undefined);

  const { mutateAsync: listPrivateKeys, error } = useListPrivateKeys({ retry: 0 });

  const errorMes = useMemo(() => {
    if (!error) return undefined;

    return `${error.message}\nダイアログを閉じると前の画面に戻ります。`;
  }, [error]);

  const handleCloseErrorDialog = useCallback(() => {
    router.back();
  }, [router]);

  const fetchPrivateKeys = useCallback(
    async (variables: ListPrivateKeysCommand) => {
      const { isAuthRequired } = variables;
      const privateKeys = await listPrivateKeys({ isAuthRequired });
      setPrivateKeys(privateKeys);
    },
    [listPrivateKeys]
  );

  useEffect(() => {
    fetchPrivateKeys({ isAuthRequired: true });
  }, [fetchPrivateKeys]);

  return (
    <ScreenContainer appBarProps={{ title: "プライベートキー管理" }} className="bg-white rounded-t-2xl px-6 py-8">
      <Box className="flex-1">
        <PrivateKeyScreenSuspence privateKeys={privateKeys}>
          {rows => (
            <VStack className="w-full flex-1 gap-y-6">
              <InfoText>長押しすることでプライベートキーが表示されます。</InfoText>
              <PrivateKeyTable rows={rows} fetchPrivateKeys={fetchPrivateKeys} />
            </VStack>
          )}
        </PrivateKeyScreenSuspence>
      </Box>

      <AlertDialog title="プライベートキー取得エラー" isOpen={!!errorMes} onClose={handleCloseErrorDialog} size="lg">
        <VStack className="py-4 gap-y-1">
          <ErrorText>{errorMes}</ErrorText>
        </VStack>
      </AlertDialog>
    </ScreenContainer>
  );
};

export default PrivateKeyScreen;
