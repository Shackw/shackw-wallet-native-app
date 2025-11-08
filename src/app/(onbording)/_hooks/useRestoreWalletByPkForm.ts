import { useState, useRef, useCallback } from "react";
import { TextInput as RNTextInput } from "react-native";

import { useBoolean } from "@/presentation/hooks/useBoolean";

type UseRestoreWalletByPkFormProps = {
  onClose: () => void;
  onRestore: (pk: string) => Promise<void>;
};

const useRestoreWalletByPkForm = (props: UseRestoreWalletByPkFormProps) => {
  const { onClose, onRestore } = props;
  const [error, setError] = useState<string>();
  const [hasValue, setHasValue] = useState(false);
  const [isRestoring, setIsRestoring] = useBoolean(false);

  const pkRef = useRef("");
  const inputRef = useRef<RNTextInput | null>(null);

  const handleChange = useCallback((t: string) => {
    pkRef.current = t;
    setHasValue(t.length > 0);
  }, []);

  const handleBlur = useCallback(() => {
    const trimmed = pkRef.current.replace(/\s/g, "");
    pkRef.current = trimmed;
    inputRef.current?.setNativeProps({ text: trimmed });
  }, []);

  const handleClear = useCallback(() => {
    if (!pkRef.current) {
      onClose();
      return;
    }
    pkRef.current = "";
    setHasValue(false);
    inputRef.current?.setNativeProps({ text: "" });
  }, [onClose]);

  const handleRestore = useCallback(async () => {
    try {
      setIsRestoring.on();
      await onRestore(pkRef.current);
    } catch (e) {
      setIsRestoring.off();
      setError(e instanceof Error ? e.message : "ウォレットの復元中に不明なエラーが発生しました。");
    }
  }, [onRestore, setIsRestoring]);

  const closeError = useCallback(() => setError(undefined), []);

  return { inputRef, hasValue, isRestoring, error, handleRestore, handleChange, handleBlur, handleClear, closeError };
};

export default useRestoreWalletByPkForm;
