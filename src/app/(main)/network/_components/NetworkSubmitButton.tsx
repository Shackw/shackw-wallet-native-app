import { ContainButton } from "@/presentation/components/Button";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText, InfoText } from "@/presentation/components/Text";

import useSelectNetworkForm from "../_hooks/useSelectNetworkForm";

const NetworkSubmitButton = () => {
  const {
    fieldMeta: { isError, isPending, isValid },
    handleConfirm
  } = useSelectNetworkForm();

  return (
    <>
      <VStack className="px-4 pt-5 gap-y-5">
        {isError ? (
          <ErrorText>ネットワークの切り替えに失敗しました。</ErrorText>
        ) : (
          <InfoText>デフォルトに設定すると起動時に自動で接続されます。</InfoText>
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
