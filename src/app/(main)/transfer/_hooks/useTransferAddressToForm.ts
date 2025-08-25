import { useCallback, useState } from "react";
import * as v from "valibot";

import { useBoolean } from "@/hooks/useBoolean";
import { addressValidator } from "@/validations/rules/addressValidator";

export type useTransferAddressToFormResult = {
  addressTo: string | undefined;
  isAddressToValid: boolean;
  addressToError: string | undefined;
  handleAddressToSubmit: (text: string) => void;
};

const TransferAddressToFormSchema = v.pipe(
  v.string("宛先アドレスを入力してください。"),
  addressValidator("有効な宛先を指定してください。")
);

const useTransferAddressToForm = (): useTransferAddressToFormResult => {
  const [addressTo, setAddressTo] = useState<string>("");
  const [isAddressToValid, setIsAddressToValid] = useBoolean(false);
  const [addressToError, setAddressToError] = useState<string | undefined>(undefined);

  const handleAddressToSubmit = useCallback(
    (addressToText: string) => {
      setIsAddressToValid.off();
      setAddressToError(undefined);

      if (addressToText === "") return setAddressTo("");

      const validation = v.safeParse(TransferAddressToFormSchema, addressToText);
      if (!validation.success) {
        setAddressToError(validation.issues[0].message);
        return;
      }

      setAddressTo(addressToText);
      setIsAddressToValid.on();
    },
    [setIsAddressToValid]
  );

  return { addressTo, isAddressToValid, addressToError, handleAddressToSubmit };
};

export default useTransferAddressToForm;
