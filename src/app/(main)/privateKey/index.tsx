import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ListPrivateKeysCommand, PrivateKeyModel } from "@/domain/privateKey";
import { AlertDialog } from "@/presentation/components/Dialog";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";
import { useFetchPrivateKeys } from "@/presentation/hooks/mutations/useFetchPrivateKeys";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import ScreenContainer from "../_components/ScreenContainer";

import PrivateKeyScreenSuspence from "./_components/PrivateKeyScreenSuspence";
import PrivateKeyTable from "./_components/PrivateKeyTable";

const PrivateKeyScreen = () => {
  const tw = useTw();
  const router = useRouter();
  const [privateKeys, setPrivateKeys] = useState<PrivateKeyModel[] | undefined>(undefined);

  const { mutateAsync: listPrivateKeys, error } = useFetchPrivateKeys({ retry: 0 });

  const errorMes = useMemo(() => {
    if (!error) return undefined;

    return `${error.message}\nダイアログを閉じると前の画面に戻ります。`;
  }, [error]);

  const handleCloseErrorDialog = useCallback(() => {
    router.dismiss();
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
    <ScreenContainer
      appBarProps={{ title: "プライベートキー管理" }}
      className={cn("bg-white", "rounded-t-2xl", tw.px(6), tw.py(8))}
    >
      <Box className="flex-1">
        <PrivateKeyScreenSuspence privateKeys={privateKeys}>
          {rows => (
            <VStack className={cn("w-full", "flex-1", tw.gapY(6))}>
              <InfoText>{`長押しすることでプライベートキーが表示されます。`}</InfoText>
              <PrivateKeyTable rows={rows} fetchPrivateKeys={fetchPrivateKeys} />
            </VStack>
          )}
        </PrivateKeyScreenSuspence>
      </Box>

      <AlertDialog title="プライベートキー取得エラー" isOpen={!!errorMes} onClose={handleCloseErrorDialog} size="lg">
        <VStack className={cn(tw.py(4), tw.gapY(1))}>
          <ErrorText>{errorMes}</ErrorText>
        </VStack>
      </AlertDialog>
    </ScreenContainer>
  );
};

export default PrivateKeyScreen;
