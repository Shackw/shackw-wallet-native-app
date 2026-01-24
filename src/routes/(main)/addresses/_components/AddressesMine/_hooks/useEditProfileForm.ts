import { useState, useRef, useCallback } from "react";
import * as v from "valibot";

import { useBoolean } from "@/presentation/hooks/useBoolean";
import { normalizeNameInput } from "@/shared/helpers/normalize";
import { nameFormValidator } from "@/shared/validations/forms/nameFormValidator";

import type { TextInput as RNTextInput } from "react-native";

type UseEditProfileFormProps = {
  initName: string;
  onClose: () => void;
  onEdit: (name: string) => Promise<void>;
};

const useEditProfileForm = (props: UseEditProfileFormProps) => {
  const { initName, onClose, onEdit } = props;
  const [error, setError] = useState<string>();
  const [hasValue, setHasValue] = useState(true);
  const [isEditing, setIsEditing] = useBoolean(false);

  const nameRef = useRef(initName);
  const inputRef = useRef<RNTextInput | null>(null);

  const handleChange = useCallback((t: string) => {
    nameRef.current = t;
    setHasValue(t.length > 0);
  }, []);

  const handleBlur = useCallback(() => {
    const normalized = normalizeNameInput(nameRef.current);
    nameRef.current = normalized;
    inputRef.current?.setNativeProps({ text: normalized });
    setHasValue(normalized.length > 0);
  }, []);

  const handleClear = useCallback(() => {
    if (!nameRef.current) {
      onClose();
      return;
    }
    nameRef.current = "";
    setHasValue(false);
    inputRef.current?.setNativeProps({ text: "" });
  }, [onClose]);

  const handleEdit = useCallback(async () => {
    setIsEditing.on();
    try {
      const value = normalizeNameInput(nameRef.current);
      const validated = v.safeParse(nameFormValidator, value);
      if (!validated.success) {
        setError(validated.issues.map(i => i.message).join("/n"));
        return;
      }
      await onEdit(value);
      onClose();
    } finally {
      setIsEditing.off();
    }
  }, [onClose, onEdit, setIsEditing]);

  const closeError = useCallback(() => setError(undefined), []);

  return { inputRef, hasValue, isEditing, error, handleEdit, handleChange, handleBlur, handleClear, closeError };
};

export default useEditProfileForm;
