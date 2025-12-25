import { useCallback, useMemo, useState } from "react";
import { Pressable } from "react-native";

import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { InfoText } from "@/presentation/components/Text";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import usePrivateKeyVerifyForm, { VerifySegmentKey, VerifySegmentValue } from "../_hooks/usePrivateKeyVerifyForm";

import PrivateKeySegmentField from "./PrivateKeySegmentField";

type PrivateKeySegmentProps = {
  segmentKey: VerifySegmentKey;
  segmentSpec: VerifySegmentValue;
};

const PrivateKeySegment = (props: PrivateKeySegmentProps) => {
  const { segmentKey: key, segmentSpec: spec } = props;

  const tw = useTw();
  const [isEditing, setIsEditing] = useBoolean(false);
  const [prevValue, setPrevValue] = useState<string | undefined>(undefined);

  const { segmentInputs: inputs } = usePrivateKeyVerifyForm();

  const title = useMemo(() => {
    switch (key) {
      case "head":
        return "確認①";
      case "tail":
        return "確認②";
      case "random":
        return "確認③";
    }
  }, [key]);

  const placeholder = useMemo(() => {
    switch (key) {
      case "head":
        return `先頭${spec.expectedLength}文字を入力してください`;
      case "tail":
        return `末尾${spec.expectedLength}文字を入力してください`;
      case "random":
        return `${spec.startIndex + 1} ~ ${spec.endIndex + 1}文字目を入力してください`;
    }
  }, [key, spec]);

  const handleEdit = useCallback(() => {
    setPrevValue(inputs[key]);
    setIsEditing.on();
  }, [inputs, key, setIsEditing]);

  return (
    <>
      <VStack className={cn("w-full", tw.px(4), tw.py(3), tw.h(28), "bg-white", "justify-center", tw.gapY(4))}>
        <InfoText>{placeholder}</InfoText>
        <HStack className={cn("items-center", "justify-between", tw.gapX(10))}>
          <AppText t="xl" className="font-bold text-secondary-700">
            {title}
          </AppText>
          <Pressable className="flex-1" onPress={handleEdit}>
            {(isEditing && prevValue) || (!isEditing && inputs[key]) ? (
              <VStack className={tw.gapY(2)}>
                <AppText t="lg" oneLine className="font-bold text-center text-secondary-800">
                  {isEditing ? prevValue : inputs[key]}
                </AppText>
              </VStack>
            ) : (
              <AppText t="md" className="text-primary-600 font-bold text-center">
                {`入力してください`}
              </AppText>
            )}
          </Pressable>
        </HStack>
      </VStack>

      <PrivateKeySegmentField
        key={`pk-segment:${key}`}
        initValue={inputs[key]}
        placeholder={placeholder}
        segmentKey={key}
        segmentSpec={spec}
        componentProps={{
          title,
          size: "lg",
          isOpen: isEditing,
          onClose: setIsEditing.off
        }}
      />
    </>
  );
};

export default PrivateKeySegment;
