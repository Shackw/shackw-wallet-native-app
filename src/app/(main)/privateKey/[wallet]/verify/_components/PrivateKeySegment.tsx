import { useCallback, useMemo, useState } from "react";
import { Pressable } from "react-native";

import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { InfoText } from "@/presentation/components/Text";
import { useBoolean } from "@/presentation/hooks/useBoolean";

import usePrivateKeyVerifyForm, { VerifySegmentKey, VerifySegmentValue } from "../_hooks/usePrivateKeyVerifyForm";

import PrivateKeySegmentField from "./PrivateKeySegmentField";

type PrivateKeySegmentProps = {
  segmentKey: VerifySegmentKey;
  segmentSpec: VerifySegmentValue;
};

const PrivateKeySegment = (props: PrivateKeySegmentProps) => {
  const { segmentKey: key, segmentSpec: spec } = props;

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
      <VStack className="w-full px-4 py-3 h-[100px] bg-white justify-center gap-y-4">
        <InfoText>{placeholder}</InfoText>
        <HStack className="items-center justify-between gap-x-10">
          <Text size="xl" className="font-bold text-secondary-700 ">
            {title}
          </Text>
          <Pressable className="flex-1" onPress={handleEdit}>
            {(isEditing && prevValue) || (!isEditing && inputs[key]) ? (
              <VStack className="gap-y-2">
                <Text
                  size="lg"
                  numberOfLines={1}
                  ellipsizeMode="middle"
                  className="font-bold text-center text-secondary-800"
                >
                  {isEditing ? prevValue : inputs[key]}
                </Text>
              </VStack>
            ) : (
              <Text size="md" className="text-primary-600 font-bold text-center">
                {`入力してください`}
              </Text>
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
