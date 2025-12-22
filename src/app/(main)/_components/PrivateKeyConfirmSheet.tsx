import { ScrollView } from "react-native";
import { Address, Hex } from "viem";

import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { ContainButton, SubContainButton } from "@/presentation/components/Button";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { InfoText } from "@/presentation/components/Text";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

type PrivateKeyConfirmCommonProps = {
  wallet: Address;
  privateKey: Hex;
  createdAtStr: string;
  componentProps: Omit<React.ComponentProps<typeof BottomActionSheet>, "children">;
};

type PrivateKeyDisplayProps = PrivateKeyConfirmCommonProps & {
  mode: "display";
  onDelete: () => void;
};

type PrivateKeyVerifyProps = PrivateKeyConfirmCommonProps & {
  mode: "verify";
  onVerify: () => void;
};

type PrivateKeyConfirmSheetProps = PrivateKeyDisplayProps | PrivateKeyVerifyProps;

const PrivateKeyConfirmSheet = (props: PrivateKeyConfirmSheetProps) => {
  const { mode, wallet, privateKey, createdAtStr, componentProps } = props;

  const { account } = useShackwWalletContext();
  const { defaultWallet } = useWalletPreferencesContext();

  const isCurrentWallet = account?.address?.toLowerCase() === wallet.toLowerCase();
  const isDefaultWallet = defaultWallet?.toLowerCase() === wallet.toLowerCase();
  const canDelete = props.mode === "display" && !isCurrentWallet && !isDefaultWallet;

  const MESSAGE_BY_MODE: Record<"display" | "verify", string> = {
    display: "プライベートキーは絶対に他人と共有しないでください。\n紛失・漏洩するとウォレットを回復できません。",
    verify: "プライベートキーはウォレットの重要なパスワードです。\n必ず安全な場所に控え、他人と共有しないでください。"
  };

  return (
    <>
      <BottomActionSheet {...componentProps}>
        <VStack className="w-full h-full justify-between gap-y-7">
          <VStack className="w-full flex-1 gap-y-4">
            <Text size="md" className="text-center font-bold text-secondary-700">
              {MESSAGE_BY_MODE[mode]}
            </Text>

            <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
              <VStack className="w-full flex-1 gap-y-3">
                <VStack className="w-full gap-y-6 border-[0.5px] border-secondary-300 px-4 py-6 bg-secondary-50 rounded-xl">
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
                    <Text className="font-bold text-secondary-800 pl-4">{privateKey}</Text>
                  </VStack>
                </VStack>
                {mode === "display" && (
                  <VStack className="w-full gap-y-3">
                    {isCurrentWallet && <InfoText>{`現在選択中のウォレットのため削除できません。`}</InfoText>}
                    {isDefaultWallet && (
                      <InfoText>{`デフォルトに設定されているウォレットため削除できません。`}</InfoText>
                    )}
                  </VStack>
                )}
                {mode === "verify" && (
                  <VStack className="w-full gap-y-3">
                    <InfoText>{`次画面で、バックアップが正しく行われているかを確認します。`}</InfoText>
                    <InfoText>{`安全にご利用いただくため、この確認が完了するまで機能を制限しています。`}</InfoText>
                  </VStack>
                )}
              </VStack>
            </ScrollView>
          </VStack>

          <HStack className="gap-x-4">
            <SubContainButton text="戻る" size="lg" className="flex-1" onPress={componentProps.onClose} />

            {canDelete && <ContainButton text="削除" size="lg" className="flex-1" onPress={props.onDelete} />}

            {mode === "verify" && (
              <ContainButton text="確認画面へ" size="lg" className="flex-1" onPress={props.onVerify} />
            )}
          </HStack>
        </VStack>
      </BottomActionSheet>
    </>
  );
};

export default PrivateKeyConfirmSheet;
