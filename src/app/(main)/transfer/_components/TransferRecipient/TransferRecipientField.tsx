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
  const { addressRows, searchText, searchTextRef, isError, handleChangeSearchText } = useAddressesRowResult;

  const [currentTab, setCurrentTab] = useState<InputMethods>("DIRECT");

  const handleClose = useCallback(() => {
    setCurrentTab("DIRECT");
    handleChangeSearchText("");
    componentProps.onClose();
  }, [componentProps, handleChangeSearchText]);

  const handleReset = useCallback(() => {
    form.setFieldValue("recipient", prevValue);
    handleClose();
  }, [form, handleClose, prevValue]);

  return (
    <BottomInputDrawer {...componentProps} onClose={handleReset}>
      <Tab options={INPUT_METHODS} value={currentTab} handleChange={setCurrentTab} />
      <Box className="w-full flex-1 py-4">
        {currentTab === "DIRECT" ? (
          <TransferRecipientDirectForm form={form} handleClose={handleClose} />
        ) : (
          <TransferRecipientSelector
            form={form}
            searchText={searchText}
            addressRows={addressRows}
            searchTextRef={searchTextRef}
            isError={isError}
            handleClose={handleClose}
            handleChangeSearchText={handleChangeSearchText}
          />
        )}
      </Box>
    </BottomInputDrawer>
  );
};

export default TransferRecipientField;
