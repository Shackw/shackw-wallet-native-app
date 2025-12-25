import { useStore } from "@tanstack/react-form";
import { useState, useCallback } from "react";
import { Pressable } from "react-native";

import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import useReceiveForm from "../../_hooks/useReceiveForm";

import ReceiveWebhookUrlField from "./ReceiveWebhookUrlField";

const ReceiveWebhookUrl = () => {
  const tw = useTw();
  const receiveForm = useReceiveForm();

  const { form } = receiveForm;
  const [isEditing, setIsEditing] = useBoolean(false);
  const [prevValue, setPrevValue] = useState<string | undefined>(undefined);

  const webhookUrl = useStore(form.baseStore, s => s.values.webhookUrl);

  const handleEdit = useCallback(() => {
    setPrevValue(webhookUrl);
    setIsEditing.on();
  }, [setIsEditing, webhookUrl]);

  return (
    <>
      <VStack className="w-full">
        <HStack
          className={cn(
            "w-full",
            tw.px(4),
            tw.py(3),
            tw.h(24),
            "bg-white",
            "items-center",
            "justify-between",
            tw.gapX(5)
          )}
        >
          <AppText t="lg" className="font-bold text-secondary-700">
            通知設定
          </AppText>
          <Pressable className="flex-1" onPress={handleEdit}>
            <AppText t="lg" className="font-bold text-right">
              {(isEditing && prevValue) || (!isEditing && webhookUrl) ? "通知する" : "通知しない"}
            </AppText>
          </Pressable>
        </HStack>
      </VStack>

      <ReceiveWebhookUrlField
        prevValue={prevValue}
        transferForm={receiveForm}
        componentProps={{
          title: "通知用URLを入力",
          size: "lg",
          isOpen: isEditing,
          onClose: setIsEditing.off
        }}
      />
    </>
  );
};

export default ReceiveWebhookUrl;
