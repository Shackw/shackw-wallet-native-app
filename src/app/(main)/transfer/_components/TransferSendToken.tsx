import { Tab } from "@/components/Tab";
import { TOKENS_MAP } from "@/registries/TokenRegistry";
import { Box } from "@/vendor/gluestack-ui/box";

import useTransferForm from "../_hooks/useTransferForm";

const TransferSendToken = () => {
  const { sendToken, setSendToken } = useTransferForm();
  return (
    <Box className="px-[12px]">
      <Tab options={TOKENS_MAP} value={sendToken} handleChange={setSendToken} />
    </Box>
  );
};

export default TransferSendToken;
