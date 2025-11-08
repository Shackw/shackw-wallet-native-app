import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Switch } from "@/presentation/components/gluestack-ui/switch";
import { Text } from "@/presentation/components/gluestack-ui/text";

import useSelectNetworkForm from "../_hooks/useSelectNetworkForm";

const NetworkDefault = () => {
  const {
    form: { isChangeDefault, setIsChangeDefault },
    fieldMeta: { isSwitchDisabled }
  } = useSelectNetworkForm();

  return (
    <HStack className="w-full px-4 py-3 h-[90px] bg-white items-center justify-between gap-x-5">
      <Text size="xl" className="font-bold text-secondary-700 ">
        デフォルト設定
      </Text>

      <HStack className="items-center gap-x-2">
        {!isSwitchDisabled ? (
          <Switch
            size="lg"
            value={isChangeDefault}
            trackColor={{ false: "#d4d4d4", true: "#525252" }}
            thumbColor="#fafafa"
            ios_backgroundColor="#d4d4d4"
            onToggle={setIsChangeDefault.toggle}
          />
        ) : (
          <Text className="font-bold">デフォルトに設定されています</Text>
        )}
      </HStack>
    </HStack>
  );
};

export default NetworkDefault;
