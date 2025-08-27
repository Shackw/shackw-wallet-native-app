import { useCallback, useState } from "react";
import * as v from "valibot";

import { useBoolean } from "@/hooks/useBoolean";
import { addressValidator } from "@/validations/rules/addressValidator";

export type useTransferRecipientFormResult = {
  recipient: string | undefined;
  isRecipientValid: boolean;
  recipientError: string | undefined;
  handleRecipientSubmit: (text: string) => void;
};

const TransferRecipientFormSchema = v.pipe(
  v.string("宛先アドレスを入力してください。"),
  addressValidator("有効な宛先を指定してください。")
);

const useTransferRecipientForm = (): useTransferRecipientFormResult => {
  const [recipient, setRecipient] = useState<string>("");
  const [isRecipientValid, setIsRecipientValid] = useBoolean(false);
  const [recipientError, setRecipientError] = useState<string | undefined>(undefined);

  const handleRecipientSubmit = useCallback(
    (recipientText: string) => {
      setIsRecipientValid.off();
      setRecipientError(undefined);

      if (recipientText === "") return setRecipient("");

      const validation = v.safeParse(TransferRecipientFormSchema, recipientText);
      if (!validation.success) {
        setRecipientError(validation.issues[0].message);
        return;
      }

      setRecipient(validation.output);
      setIsRecipientValid.on();
    },
    [setIsRecipientValid]
  );

  return { recipient, isRecipientValid, recipientError, handleRecipientSubmit };
};

export default useTransferRecipientForm;
