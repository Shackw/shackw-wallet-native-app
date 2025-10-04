import { SearchIcon } from "lucide-react-native";

import { Box } from "@/vendor/gluestack-ui/box";
import { Input, InputSlot, InputIcon, InputField } from "@/vendor/gluestack-ui/input";

type AddressesSearcherProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  componetProps?: Omit<React.ComponentProps<typeof Box>, "children">;
};

const AddressesSearcher = (props: AddressesSearcherProps) => {
  const { searchText, setSearchText, componetProps } = props;
  return (
    <Box {...componetProps}>
      <Input size="lg" className="px-2 rounded-xl h-14">
        <InputSlot>
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField placeholder="検索..." value={searchText} onChangeText={e => setSearchText(e)} />
      </Input>
    </Box>
  );
};

export default AddressesSearcher;
