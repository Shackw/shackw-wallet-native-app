import { ScrollView } from "react-native";
import { Address, Hex } from "viem";

import { AppText } from "@/presentation/components/AppText";
import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { ContainButton, SubContainButton } from "@/presentation/components/Button";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { InfoText } from "@/presentation/components/Text";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

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

  const tw = useTw();

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
        <VStack className={cn("w-full h-full justify-between", tw.gapY(7))}>
          <VStack className={cn("w-full flex-1", tw.gapY(4))}>
            <AppText t="md" className="text-center font-bold text-secondary-700">
              {MESSAGE_BY_MODE[mode]}
            </AppText>

            <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
              <VStack className={cn("w-full flex-1", tw.gapY(3))}>
                <VStack
                  className={cn(
                    "w-full bg-secondary-50 rounded-xl border-secondary-300 border-[0.5px]",
                    tw.px(4),
                    tw.py(6),
                    tw.gapY(6)
                  )}
                >
                  <VStack className={cn("w-full", tw.gapY(1.5))}>
                    <AppText t="sm" className="font-bold text-secondary-600">
                      作成・復元 日時
                    </AppText>
                    <AppText t="md" className={cn("font-bold text-secondary-800", tw.pl(4))}>
                      {createdAtStr}
                    </AppText>
                  </VStack>

                  <VStack className={cn("w-full", tw.gapY(1.5))}>
                    <AppText t="sm" className="font-bold text-secondary-600">
                      ウォレットアドレス
                    </AppText>
                    <AppText t="md" className={cn("font-bold text-secondary-800", tw.pl(4))}>
                      {wallet}
                    </AppText>
                  </VStack>

                  <VStack className={cn("w-full", tw.gapY(1.5))}>
                    <AppText t="sm" className="font-bold text-secondary-600">
                      プライベートキー
                    </AppText>
                    <AppText t="md" className={cn("font-bold text-secondary-800", tw.pl(4))}>
                      {privateKey}
                    </AppText>
                  </VStack>
                </VStack>

                {mode === "display" && (
                  <VStack className={cn("w-full", tw.gapY(3))}>
                    {isCurrentWallet && <InfoText>{`現在選択中のウォレットのため削除できません。`}</InfoText>}
                    {isDefaultWallet && (
                      <InfoText>{`デフォルトに設定されているウォレットため削除できません。`}</InfoText>
                    )}
                  </VStack>
                )}

                {mode === "verify" && (
                  <VStack className={cn("w-full", tw.gapY(3))}>
                    <InfoText>{`次画面で、バックアップが正しく行われているかを確認します。`}</InfoText>
                    <InfoText>{`安全にご利用いただくため、この確認が完了するまで機能を制限しています。`}</InfoText>
                  </VStack>
                )}
              </VStack>
            </ScrollView>
          </VStack>

          <HStack className={cn(tw.gapX(4))}>
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
