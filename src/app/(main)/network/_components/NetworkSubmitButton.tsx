import { ContainButton } from "@/presentation/components/Button";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import useSelectNetworkForm from "../_hooks/useSelectNetworkForm";

const NetworkSubmitButton = () => {
  const tw = useTw();
  const {
    fieldMeta: { isError, isPending, isValid },
    handleConfirm
  } = useSelectNetworkForm();

  return (
    <>
      <VStack className={cn(tw.px(4), tw.pt(5), tw.gapY(5))}>
        {isError ? (
          <ErrorText>{`ネットワークの切り替えに失敗しました。`}</ErrorText>
        ) : (
          <InfoText>{`デフォルトに設定すると起動時に自動で接続されます。`}</InfoText>
        )}
        <ContainButton
          text="ネットワークを変更"
          size="lg"
          isLoading={isPending}
          isDisabled={!isValid || isPending}
          onPress={handleConfirm}
          className="w-full mx-auto"
        />
      </VStack>
    </>
  );
};

export default NetworkSubmitButton;
