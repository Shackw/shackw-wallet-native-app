import { useMemo, useState } from "react";

type InitialState = boolean | (() => boolean);

interface SetBooleanAction {
  set: (value: boolean) => void;
  on: () => void;
  off: () => void;
  toggle: () => void;
}

export const useBoolean = (initialState: InitialState = false) => {
  const [value, setValue] = useState(initialState);
  const callbacks = useMemo(
    (): SetBooleanAction => ({
      set: (value: boolean) => {
        setValue(value);
      },
      on: () => {
        setValue(true);
      },
      off: () => {
        setValue(false);
      },
      toggle: () => {
        setValue(prev => !prev);
      }
    }),
    []
  );
  return [value, callbacks] as const;
};
