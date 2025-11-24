import { Box } from "@/presentation/components/gluestack-ui/box";
import { Tab } from "@/presentation/components/Tab";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

import useTransferForm from "../_hooks/useTransferForm";

const TransferSendToken = () => {
  const { sendToken, setSendToken } = useTransferForm();
  const { currentChainSupportedTokens } = useWalletPreferencesContext();

  return (
    <Box className="px-[12px]">
      <Tab options={currentChainSupportedTokens} value={sendToken} handleChange={setSendToken} />
    </Box>
  );
};

export default TransferSendToken;
