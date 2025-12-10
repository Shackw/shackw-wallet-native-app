import { setStringAsync } from "expo-clipboard";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { Address, Hex } from "viem";

import { ListPrivateKeysCommand } from "@/domain/privateKey";
import BackDrop from "@/presentation/components/BackDrop";
import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { ContainButton, SubContainButton, TextButton } from "@/presentation/components/Button";
import { ActionDialog, AlertDialog } from "@/presentation/components/Dialog";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";
import { useDeletePrivateKey } from "@/presentation/hooks/mutations/useDeletePrivateKey";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

type PrivateKeyDisplyFieldProps = {
  wallet: Address;
  privateKey: Hex;
  createdAtStr: string;
  componentProps: Omit<React.ComponentProps<typeof BottomActionSheet>, "children">;
  fetchPrivateKeys: (variables: ListPrivateKeysCommand) => Promise<void>;
};

const PrivateKeyDisplyField = (props: PrivateKeyDisplyFieldProps) => {
  const { wallet, privateKey, createdAtStr, componentProps, fetchPrivateKeys } = props;

  const router = useRouter();
  const { account } = useShackwWalletContext();
  const { defaultWallet } = useWalletPreferencesContext();
  const [isDeleting, setIsDeleting] = useBoolean(false);
  const { mutateAsync: deletePrivateKey, error, isPending } = useDeletePrivateKey();

  const isCurrentWallet = useMemo(
    () => account?.address.toLowerCase() === wallet.toLowerCase(),
    [account?.address, wallet]
  );

  const isDefaultWallet = useMemo(() => defaultWallet?.toLowerCase() === wallet.toLowerCase(), [defaultWallet, wallet]);

  const errorMes = useMemo(() => {
    if (!error) return undefined;

    return `${error.message}\nダイアログを閉じると前の画面に戻ります。`;
  }, [error]);

  const handleCopyPrivateKey = useCallback(() => {
    setStringAsync(privateKey);
  }, [privateKey]);

  const handleCloseErrorDialog = useCallback(() => {
    router.back();
  }, [router]);

  const handleDeletePrivateKey = useCallback(async () => {
    try {
      await deletePrivateKey(wallet);
      fetchPrivateKeys({ isAuthRequired: false });
    } finally {
      setIsDeleting.off();
    }
  }, [wallet, setIsDeleting, fetchPrivateKeys, deletePrivateKey]);

  return (
    <>
      {isPending && <BackDrop visible />}
      <BottomActionSheet {...componentProps}>
        <VStack className="flex-1 w-full items-center gap-y-4">
          <Text size="md" className="text-center font-bold text-secondary-700">
            {"プライベートキーは絶対に他人と共有しないでください。\n紛失・漏洩するとウォレットを回復できません。"}
          </Text>
          <VStack className="w-full gap-y-8 border-[0.5px] border-secondary-300 px-4 py-6 bg-secondary-50 rounded-xl">
            <VStack className="w-full gap-y-1.5">
              <Text className="font-bold text-secondary-600">作成・復元 日時</Text>
              <Text className="font-bold text-secondary-800 pl-4">{createdAtStr}</Text>
            </VStack>
            <VStack className="w-full gap-y-1.5">
              <Text className="font-bold text-secondary-600">ウォレットアドレス</Text>
              <Text className="font-bold text-secondary-800 pl-4">{wallet}</Text>
            </VStack>
            <VStack className="w-full gap-y-1.5">
              <Text className="font-bold text-secondary-600">プライベートキー</Text>
              <TextButton textProps={{ className: "font-bold text-secondary-800 pl-4" }} onPress={handleCopyPrivateKey}>
                {privateKey}
              </TextButton>
            </VStack>
          </VStack>
          <InfoText>プライベートキーを押すとコピーできます。</InfoText>
          {isCurrentWallet && <InfoText>現在選択中のウォレットのため削除できません。</InfoText>}
          {isDefaultWallet && <InfoText>デフォルトに設定されているウォレットため削除できません。</InfoText>}
        </VStack>

        <HStack className="gap-x-4">
          <SubContainButton text="戻る" size="lg" className="flex-1" onPress={componentProps.onClose} />
          {!isCurrentWallet && !isDefaultWallet && (
            <ContainButton text="削除" size="lg" className="flex-1" onPress={setIsDeleting.on} />
          )}
        </HStack>
      </BottomActionSheet>

      <ActionDialog
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

      <AlertDialog title="プライベートキー削除失敗" isOpen={!!errorMes} onClose={handleCloseErrorDialog} size="lg">
        <VStack className="py-4 gap-y-1">
          <ErrorText>{errorMes}</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default PrivateKeyDisplyField;
