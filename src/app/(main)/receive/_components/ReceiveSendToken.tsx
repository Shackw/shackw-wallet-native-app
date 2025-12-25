import { Box } from "@/presentation/components/gluestack-ui/box";
import { Tab } from "@/presentation/components/Tab";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import useReceiveForm from "../_hooks/useReceiveForm";

const ReceiveSendToken = () => {
  const tw = useTw();
  const { sendToken, setSendToken } = useReceiveForm();
  const { currentChainSupportedTokens } = useWalletPreferencesContext();

  return (
    <Box className={cn(tw.px(3))}>
      <Tab options={currentChainSupportedTokens} value={sendToken} handleChange={setSendToken} />
    </Box>
  );
};

export default ReceiveSendToken;
