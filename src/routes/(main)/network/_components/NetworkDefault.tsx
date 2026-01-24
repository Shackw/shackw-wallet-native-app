import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Switch } from "@/presentation/components/gluestack-ui/switch";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import useSelectNetworkForm from "../_hooks/useSelectNetworkForm";

const NetworkDefault = () => {
  const tw = useTw();
  const {
    form: { isChangeDefault, setIsChangeDefault },
    fieldMeta: { isSwitchDisabled }
  } = useSelectNetworkForm();

  return (
    <HStack
      className={cn("w-full", tw.px(4), tw.py(3), tw.h(24), "bg-white", "items-center", "justify-between", tw.gapX(5))}
    >
      <AppText t="lg" className="font-bold text-secondary-700">
        デフォルト設定
      </AppText>

      <HStack className={cn("items-center", tw.gapX(2))}>
        {!isSwitchDisabled ? (
          <Switch
            size={tw.inputNoXl("lg")}
            value={isChangeDefault}
            trackColor={{ false: "#d4d4d4", true: "#525252" }}
            thumbColor="#fafafa"
            ios_backgroundColor="#d4d4d4"
            onToggle={setIsChangeDefault.toggle}
          />
        ) : (
          <AppText className="font-bold">デフォルトに設定されています</AppText>
        )}
      </HStack>
    </HStack>
  );
};

export default NetworkDefault;
