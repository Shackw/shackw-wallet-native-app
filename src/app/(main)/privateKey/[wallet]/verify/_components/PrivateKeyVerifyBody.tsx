import BackDrop from "@/presentation/components/BackDrop";
import { ContainButton } from "@/presentation/components/Button";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";

import usePrivateKeyVerifyForm, { VerifySegmentKey } from "../_hooks/usePrivateKeyVerifyForm";

import PrivateKeySegment from "./PrivateKeySegment";

const PrivateKeyVerifyBody = () => {
  const { segmentSpecs, isValid, error, isPending, verifyPrivateKey } = usePrivateKeyVerifyForm();

  return (
    <VStack className="flex-1 bg-secondary-100">
      <BackDrop visible={isPending} />
      <VStack className="gap-y-8">
        {Object.entries(segmentSpecs).map(([key, value]) => (
          <PrivateKeySegment key={key} segmentKey={key as VerifySegmentKey} segmentSpec={value} />
        ))}
      </VStack>
      <VStack className="p-4 gap-y-6 justify-between">
        {error ? (
          <ErrorText>{error.message}</ErrorText>
        ) : (
          <InfoText>{`セキュリティ保護のため、この画面でプライベートキーを再表示できません。再確認する場合はホーム画面に戻ってください。`}</InfoText>
        )}
        <ContainButton text="確認" size="lg" isDisabled={!isValid} onPress={verifyPrivateKey} />
      </VStack>
    </VStack>
  );
};

export default PrivateKeyVerifyBody;
