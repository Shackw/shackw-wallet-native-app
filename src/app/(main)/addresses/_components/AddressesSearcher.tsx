import { SearchIcon } from "lucide-react-native";

import { Box } from "@/vendor/gluestack-ui/box";
import { Input, InputSlot, InputIcon, InputField } from "@/vendor/gluestack-ui/input";

type AddressesSearcherProps = { searchText: string; setSearchText: React.Dispatch<React.SetStateAction<string>> };

const AddressesSearcher = (props: AddressesSearcherProps) => {
  const { searchText, setSearchText } = props;
  return (
    <Box className="w-full py-3">
      <Input size="lg" className="px-3 rounded-xl h-12">
        <InputSlot>
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField placeholder="検索..." value={searchText} onChangeText={e => setSearchText(e)} />
      </Input>
    </Box>
  );
};

export default AddressesSearcher;
