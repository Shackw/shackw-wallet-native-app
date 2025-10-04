import React, { useCallback, useState } from "react";

import { BottomInputDrawer } from "@/components/Drawer";
import { Tab } from "@/components/Tab";
import useAddressesRow from "@/hooks/useAddressesRow";
import { Box } from "@/vendor/gluestack-ui/box";

import { TransferFormContextType } from "../../_hooks/useTransferForm";

import TransferRecipientDirectForm from "./TransferRecipientDirectForm";
import TransferRecipientSelector from "./TransferRecipientSelector";

type TransferRecipientFieldProps = {
  prevValue: string;
  transferForm: TransferFormContextType;
  useAddressesRowResult: ReturnType<typeof useAddressesRow>;
  componentProps: Omit<React.ComponentProps<typeof BottomInputDrawer>, "children">;
};

const INPUT_METHODS = {
  DIRECT: "直接入力",
  SELECT: "アドレス帳"
} as const;
type InputMethods = keyof typeof INPUT_METHODS;

const TransferRecipientField = (props: TransferRecipientFieldProps) => {
  const { prevValue, transferForm, useAddressesRowResult, componentProps } = props;

  const { form } = transferForm;
  const { addressRows, searchText, isError, setSearchText } = useAddressesRowResult;

  const [currentTab, setCurrentTab] = useState<InputMethods>("DIRECT");

  const handleClose = useCallback(() => {
    form.setFieldValue("recipient", prevValue);
    componentProps.onClose();
  }, [componentProps, form, prevValue]);

  return (
    <BottomInputDrawer {...componentProps} onClose={handleClose}>
      <Tab options={INPUT_METHODS} value={currentTab} handleChange={setCurrentTab} />
      <Box className="w-full flex-1 py-4">
        {currentTab === "DIRECT" ? (
          <TransferRecipientDirectForm form={form} handleClose={componentProps.onClose} />
        ) : (
          <TransferRecipientSelector
            form={form}
            addressRows={addressRows}
            searchText={searchText}
            isError={isError}
            handleClose={componentProps.onClose}
            setSearchText={setSearchText}
          />
        )}
      </Box>
    </BottomInputDrawer>
  );
};

export default TransferRecipientField;
