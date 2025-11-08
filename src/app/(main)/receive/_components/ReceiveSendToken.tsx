import { Box } from "@/presentation/components/gluestack-ui/box";
import { Tab } from "@/presentation/components/Tab";
import { TOKENS_MAP } from "@/registries/TokenRegistry";

import useReceiveForm from "../_hooks/useReceiveForm";

const ReceiveSendToken = () => {
  const { sendToken, setSendToken } = useReceiveForm();
  return (
    <Box className="px-[12px]">
      <Tab options={TOKENS_MAP} value={sendToken} handleChange={setSendToken} />
    </Box>
  );
};

export default ReceiveSendToken;
