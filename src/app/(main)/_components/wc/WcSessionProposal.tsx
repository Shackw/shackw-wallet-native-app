import { SignClientTypes } from "@walletconnect/types";
import { ScrollView } from "react-native";

import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { SubContainButton, ContainButton } from "@/presentation/components/Button";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";

type WcSessionProposalProps = {
  proposal?: SignClientTypes.EventArguments["session_proposal"];
  componentProps: Omit<React.ComponentProps<typeof BottomActionSheet>, "children" | "onClose">;
  handleApproveProposal: () => void;
  handleRejectProposal: () => void;
};

const WcSessionProposal = (props: WcSessionProposalProps) => {
  const { proposal, componentProps, handleApproveProposal, handleRejectProposal } = props;

  const meta = proposal?.params?.proposer?.metadata;
  const name = meta?.name ?? "-";
  const url = meta?.url ?? "-";
  const description = meta?.description ?? "";

  const verified = proposal?.verifyContext?.verified as any;
  const origin = verified?.origin ?? "";
  const verifyUrl = verified?.verifyUrl ?? "";
  const isScam = verified?.isScam;

  return (
    <BottomActionSheet {...componentProps} onClose={handleRejectProposal}>
      <VStack className="w-full h-full justify-between gap-y-7">
        <VStack className="w-full flex-1 gap-y-7">
          <Text size="md" className="text-center font-bold text-secondary-700">
            {"以下のアプリから接続のリクエストがあります。\n内容を確認し、問題なければ「許可」を押してください。"}
          </Text>

          <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
            <VStack className="gap-y-5">
              <VStack className="w-full gap-y-2">
                <HStack className="gap-x-2">
                  <Box className="w-1.5 bg-primary-500" />
                  <Text className="font-bold">アプリ情報</Text>
                </HStack>

                <VStack className="border-[0.5px] border-secondary-300 p-4 bg-secondary-50 rounded-xl gap-y-3">
                  <VStack className="gap-y-1">
                    <Text className="font-bold text-secondary-600">名前</Text>
                    <Text className="font-bold text-secondary-800 text-right">{name}</Text>
                  </VStack>

                  <VStack className="gap-y-1">
                    <Text className="font-bold text-secondary-600">URL</Text>
                    <Text className="font-bold text-secondary-800 text-right">{url}</Text>
                  </VStack>

                  {description ? (
                    <VStack className="gap-y-1">
                      <Text className="font-bold text-secondary-600">説明</Text>
                      <Text className="font-bold text-secondary-800 text-right">{description}</Text>
                    </VStack>
                  ) : null}
                </VStack>
              </VStack>

              {origin || verifyUrl || typeof isScam === "boolean" ? (
                <VStack className="w-full gap-y-2">
                  <HStack className="gap-x-2">
                    <Box className="w-1.5 bg-primary-500" />
                    <Text className="font-bold">検証</Text>
                  </HStack>

                  <VStack className="border-[0.5px] border-secondary-300 p-4 bg-secondary-50 rounded-xl gap-y-3">
                    {origin ? (
                      <VStack className="gap-y-1">
                        <Text className="font-bold text-secondary-600">オリジン</Text>
                        <Text className="font-bold text-secondary-800 text-right">{origin}</Text>
                      </VStack>
                    ) : null}

                    {verifyUrl ? (
                      <VStack className="gap-y-1">
                        <Text className="font-bold text-secondary-600">検証URL</Text>
                        <Text className="font-bold text-secondary-800 text-right">{verifyUrl}</Text>
                      </VStack>
                    ) : null}

                    {typeof isScam === "boolean" ? (
                      <VStack className="gap-y-1">
                        <Text className="font-bold text-secondary-600">注意</Text>
                        <Text className="font-bold text-secondary-800 text-right">
                          {isScam ? "危険な可能性があります" : "問題は検出されていません"}
                        </Text>
                      </VStack>
                    ) : null}
                  </VStack>
                </VStack>
              ) : null}
            </VStack>
          </ScrollView>
        </VStack>

        <HStack className="gap-x-4">
          <SubContainButton text="拒否" size="lg" className="flex-1" onPress={handleRejectProposal} />
          <ContainButton text="許可" size="lg" className="flex-1" onPress={handleApproveProposal} />
        </HStack>
      </VStack>
    </BottomActionSheet>
  );
};

export default WcSessionProposal;
