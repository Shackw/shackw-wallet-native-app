import { useStore } from "@tanstack/react-form";
import { useState, useCallback } from "react";
import { Pressable } from "react-native";

import { useBoolean } from "@/hooks/useBoolean";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useReceiveForm from "../../_hooks/useReceiveForm";

import ReceiveWebhookUrlField from "./ReceiveWebhookUrlField";

const ReceiveWebhookUrl = () => {
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
        <HStack className="w-full px-4 py-3 h-[90px] bg-white items-center justify-between gap-x-5">
          <Text size="xl" className="font-bold text-secondary-700 ">
            通知設定
          </Text>
          <Pressable className="flex-1" onPress={handleEdit}>
            <Text size="lg" className="font-bold text-right">
              {(isEditing && prevValue) || (!isEditing && webhookUrl) ? "通知する" : "通知しない"}
            </Text>
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
