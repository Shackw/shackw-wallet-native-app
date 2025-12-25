import { Box } from "@/presentation/components/gluestack-ui/box";
import { Tab } from "@/presentation/components/Tab";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import useTransferForm from "../_hooks/useTransferForm";

const TransferSendToken = () => {
  const tw = useTw();
  const { sendToken, setSendToken } = useTransferForm();
  const { currentChainSupportedTokens } = useWalletPreferencesContext();

  return (
    <Box className={cn(tw.px(3))}>
      <Tab options={currentChainSupportedTokens} value={sendToken} handleChange={setSendToken} />
    </Box>
  );
};

export default TransferSendToken;
