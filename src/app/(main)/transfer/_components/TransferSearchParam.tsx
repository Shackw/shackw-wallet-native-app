import { memo, useEffect } from "react";

import { AlertDialog } from "@/presentation/components/Dialog";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText } from "@/presentation/components/Text";
import { useAddressesRow } from "@/presentation/hooks/useAddressesRow";
import { useLoadingOverlay } from "@/presentation/providers/LoadingOverlayProvider";

import useTransferSearchParam from "../_hooks/useTransferSearchParam";

import TransferConfirm from "./TransferConfirm";

const TransferSearchParam = () => {
  const { addressToName } = useAddressesRow();
  const { isParsing, isConfirming, isError, confirmProps, setIsConfirming, setIsError } = useTransferSearchParam();
  const { show, hide } = useLoadingOverlay();

  useEffect(() => {
    if (!isParsing) return;
    show();
    return () => {
      hide();
    };
  }, [isParsing, show, hide]);

  if (isParsing) return null;

  return (
    <>
      <TransferConfirm
        {...confirmProps}
        name={addressToName[confirmProps.recipient.toLowerCase()]}
        componentProps={{ title: "内容確認", size: "lg", isOpen: isConfirming, onClose: setIsConfirming.off }}
      />

      <AlertDialog title="読み取りエラー" isOpen={isError} onClose={setIsError.off} size="lg">
        <VStack className="py-4 gap-y-1">
          <ErrorText>読み込まれた情報が正しくない可能性があります。</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default memo(TransferSearchParam);
