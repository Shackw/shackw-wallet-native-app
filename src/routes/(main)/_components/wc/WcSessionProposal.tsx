import { ScrollView } from "react-native";

import { AppText } from "@/presentation/components/AppText";
import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { SubContainButton, ContainButton } from "@/presentation/components/Button";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import type { SignClientTypes } from "@walletconnect/types";

type WcSessionProposalProps = {
  proposal?: SignClientTypes.EventArguments["session_proposal"];
  componentProps: Omit<React.ComponentProps<typeof BottomActionSheet>, "children" | "onClose">;
  onApproveProposal: () => void;
  onRejectProposal: () => void;
};

const WcSessionProposal = (props: WcSessionProposalProps) => {
  const { proposal, componentProps, onApproveProposal, onRejectProposal } = props;

  const tw = useTw();

  const meta = proposal?.params?.proposer?.metadata;
  const name = meta?.name ?? "-";
  const url = meta?.url ?? "-";
  const description = meta?.description ?? "";

  const verified = proposal?.verifyContext?.verified as any;
  const origin = verified?.origin ?? "";
  const verifyUrl = verified?.verifyUrl ?? "";
  const isScam = verified?.isScam;

  return (
    <BottomActionSheet {...componentProps} onClose={onRejectProposal}>
      <VStack className={cn("w-full h-full justify-between", tw.gapY(7))}>
        <VStack className={cn("w-full flex-1", tw.gapY(7))}>
          <AppText t="md" className="text-center font-bold text-secondary-700">
            {"以下のアプリから接続のリクエストがあります。\n内容を確認し、問題なければ「許可」を押してください。"}
          </AppText>

          <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
            <VStack className={cn(tw.gapY(5))}>
              <VStack className={cn("w-full", tw.gapY(2))}>
                <HStack className={cn(tw.gapX(2))}>
                  <Box className={cn(tw.w(1.5), "bg-primary-500")} />
                  <AppText t="md" className="font-bold">
                    アプリ情報
                  </AppText>
                </HStack>

                <VStack className={cn("bg-secondary-50 rounded-xl border-secondary-300", tw.p(4), tw.gapY(3))}>
                  <VStack className={cn(tw.gapY(1))}>
                    <AppText t="sm" className="font-bold text-secondary-600">
                      名前
                    </AppText>
                    <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
                      {name}
                    </AppText>
                  </VStack>

                  <VStack className={cn(tw.gapY(1))}>
                    <AppText t="sm" className="font-bold text-secondary-600">
                      URL
                    </AppText>
                    <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
                      {url}
                    </AppText>
                  </VStack>

                  {description ? (
                    <VStack className={cn(tw.gapY(1))}>
                      <AppText t="sm" className="font-bold text-secondary-600">
                        説明
                      </AppText>
                      <AppText t="md" className="font-bold text-secondary-800 text-right">
                        {description}
                      </AppText>
                    </VStack>
                  ) : null}
                </VStack>
              </VStack>

              {origin || verifyUrl || typeof isScam === "boolean" ? (
                <VStack className={cn("w-full", tw.gapY(2))}>
                  <HStack className={cn(tw.gapX(2))}>
                    <Box className={cn(tw.w(1.5), "bg-primary-500")} />
                    <AppText t="md" className="font-bold">
                      検証
                    </AppText>
                  </HStack>

                  <VStack className={cn("bg-secondary-50 rounded-xl border-secondary-300", tw.p(4), tw.gapY(3))}>
                    {origin ? (
                      <VStack className={cn(tw.gapY(1))}>
                        <AppText t="sm" className="font-bold text-secondary-600">
                          オリジン
                        </AppText>
                        <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
                          {origin}
                        </AppText>
                      </VStack>
                    ) : null}

                    {verifyUrl ? (
                      <VStack className={cn(tw.gapY(1))}>
                        <AppText t="sm" className="font-bold text-secondary-600">
                          検証URL
                        </AppText>
                        <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
                          {verifyUrl}
                        </AppText>
                      </VStack>
                    ) : null}

                    {typeof isScam === "boolean" ? (
                      <VStack className={cn(tw.gapY(1))}>
                        <AppText t="sm" className="font-bold text-secondary-600">
                          注意
                        </AppText>
                        <AppText t="md" className="font-bold text-secondary-800 text-right" oneLine>
                          {isScam ? "危険な可能性があります" : "問題は検出されていません"}
                        </AppText>
                      </VStack>
                    ) : null}
                  </VStack>
                </VStack>
              ) : null}
            </VStack>
          </ScrollView>
        </VStack>

        <HStack className={cn(tw.gapX(4))}>
          <SubContainButton text="拒否" size="lg" className="flex-1" onPress={onRejectProposal} />
          <ContainButton text="許可" size="lg" className="flex-1" onPress={onApproveProposal} />
        </HStack>
      </VStack>
    </BottomActionSheet>
  );
};

export default WcSessionProposal;
