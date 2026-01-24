import { SearchIcon } from "lucide-react-native";

import { Box } from "@/presentation/components/gluestack-ui/box";
import { Input, InputSlot, InputIcon, InputField } from "@/presentation/components/gluestack-ui/input";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import type { RefObject } from "react";
import type { TextInput } from "react-native";

type SearcherProps = {
  defaultValue?: string;
  inputRef: RefObject<TextInput | null>;
  handleChange: (t: string) => void;
  componetProps?: Omit<React.ComponentProps<typeof Box>, "children">;
};

const Searcher = (props: SearcherProps) => {
  const tw = useTw();
  const { defaultValue = "", inputRef, handleChange, componetProps } = props;

  return (
    <Box {...componetProps}>
      <Input size={tw.input("lg")} className={cn(tw.px(2), "rounded-xl", tw.h(14))}>
        <InputSlot>
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          defaultValue={defaultValue}
          ref={inputRef as any}
          placeholder="検索..."
          onChangeText={handleChange}
        />
      </Input>
    </Box>
  );
};

export default Searcher;
