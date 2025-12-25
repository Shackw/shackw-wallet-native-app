import { ComponentProps, useCallback, useState } from "react";

import { BottomActionSheet } from "@/presentation/components/BottomActionSheet";
import { AlertDialog } from "@/presentation/components/Dialog";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { ErrorText } from "@/presentation/components/Text";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import usePrivateKeyVerifyForm, { VerifySegmentKey, VerifySegmentValue } from "../_hooks/usePrivateKeyVerifyForm";

import PrivateKeySegmentForm from "./PrivateKeySegmentForm";

type PrivateKeySegmentFieldProps = {
  initValue: string;
  placeholder: string;
  segmentKey: VerifySegmentKey;
  segmentSpec: VerifySegmentValue;
  componentProps: Omit<ComponentProps<typeof BottomActionSheet>, "children">;
};

const PrivateKeySegmentField = (props: PrivateKeySegmentFieldProps) => {
  const tw = useTw();
  const { initValue, placeholder, segmentKey: key, segmentSpec: spec, componentProps } = props;

  const [error, setError] = useState<string | undefined>(undefined);
  const { setSegmentValue, resetSegmentValue } = usePrivateKeyVerifyForm();

  const handleEdit = useCallback(
    (value: string) => {
      try {
        setSegmentValue(key, value);
        componentProps.onClose();
      } catch (e) {
        setError(e instanceof Error ? e.message : "プライベートキーの検証確認中に不明なエラーが発生しました。");
      }
    },
    [componentProps, key, setSegmentValue]
  );

  const handleReset = useCallback(() => {
    resetSegmentValue(key);
  }, [key, resetSegmentValue]);

  return (
    <>
      <BottomActionSheet {...componentProps}>
        <PrivateKeySegmentForm
          initValue={initValue}
          placeholder={placeholder}
          maxLength={spec.expectedLength}
          onEdit={handleEdit}
          onReset={handleReset}
          onClose={componentProps.onClose}
        />
      </BottomActionSheet>

      <AlertDialog
        key={`confirm-segment-failed:${key}`}
        title="プライベートキーの取得失敗"
        isOpen={!!error}
        onClose={() => setError(undefined)}
        size="lg"
      >
        <VStack className={cn(tw.py(4), tw.gapY(1))}>
          <ErrorText>{error}</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default PrivateKeySegmentField;
