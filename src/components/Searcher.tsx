import { SearchIcon } from "lucide-react-native";
import { RefObject } from "react";
import { TextInput } from "react-native";

import { Box } from "@/vendor/gluestack-ui/box";
import { Input, InputSlot, InputIcon, InputField } from "@/vendor/gluestack-ui/input";

type SearcherProps = {
  defaultValue?: string;
  inputRef: RefObject<TextInput | null>;
  handleChange: (t: string) => void;
  componetProps?: Omit<React.ComponentProps<typeof Box>, "children">;
};

const Searcher = (props: SearcherProps) => {
  const { defaultValue = "", inputRef, handleChange, componetProps } = props;
  return (
    <Box {...componetProps}>
      <Input size="lg" className="px-2 rounded-xl h-14">
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
