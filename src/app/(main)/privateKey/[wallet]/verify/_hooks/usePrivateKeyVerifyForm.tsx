import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { Address } from "viem";

import { EnablePrivateKeyCommand, PrivateKeyVerifySegment } from "@/domain/privateKey";
import { useEnablePrivateKey } from "@/presentation/hooks/mutations/useEnablePrivateKey";
import { useSafeCloseToHome } from "@/presentation/hooks/useSafeCloseToHome";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { normalizeAlphanumericInput } from "@/shared/helpers/normalize";
import { randInt } from "@/shared/helpers/number";

export type VerifySegmentKey = "head" | "tail" | "random";

export type VerifySegmentValue = Pick<PrivateKeyVerifySegment, "startIndex" | "endIndex"> & {
  expectedLength: number;
};

type VerifySegmentSpecs = Record<VerifySegmentKey, VerifySegmentValue>;

type UsePrivateKeyVerifyFormProviderProps = {
  wallet: Address;
};

const usePrivateKeyVerifyFormProvider = ({ wallet }: UsePrivateKeyVerifyFormProviderProps) => {
  const { safeClose } = useSafeCloseToHome();
  const { enableWallet } = useShackwWalletContext();
  const { mutateAsync: enablePrivateKey, isPending, error } = useEnablePrivateKey();

  const [head, setHead] = useState("");
  const [tail, setTail] = useState("");
  const [random, setRandom] = useState("");

  const segmentInputs = useMemo<Record<VerifySegmentKey, string>>(() => ({ head, tail, random }), [head, tail, random]);

  const segmentSpecs = useMemo<VerifySegmentSpecs>(() => {
    const headLength = 4;
    const tailLength = 4;
    const randomLength = 3;

    const randomStartIndex = randInt(headLength, 12);

    return {
      head: { startIndex: 0, endIndex: headLength - 1, expectedLength: headLength },
      tail: { startIndex: 65 - tailLength + 1, endIndex: 65, expectedLength: tailLength },
      random: {
        startIndex: randomStartIndex,
        endIndex: randomStartIndex + randomLength - 1,
        expectedLength: randomLength
      }
    };
  }, []);

  const validateSegment = useCallback(
    (key: VerifySegmentKey, value: string): string => {
      const { expectedLength } = segmentSpecs[key];
      const reg = new RegExp(`^[A-Za-z0-9]{${expectedLength}}$`);
      if (!reg.test(value)) throw new Error(`${expectedLength}文字の半角英数字を入力してください。`);
      return value;
    },
    [segmentSpecs]
  );

  const setSegmentValue = useCallback(
    (key: VerifySegmentKey, value: string) => {
      const normalized = normalizeAlphanumericInput(value);
      const validated = validateSegment(key, normalized);

      switch (key) {
        case "head":
          setHead(validated);
          return;
        case "tail":
          setTail(validated);
          return;
        case "random":
          setRandom(validated);
          return;
      }
    },
    [validateSegment]
  );

  const resetSegmentValue = useCallback((key: VerifySegmentKey) => {
    switch (key) {
      case "head":
        setHead("");
        return;
      case "tail":
        setTail("");
        return;
      case "random":
        setRandom("");
        return;
    }
  }, []);

  const isValid = useMemo(() => {
    try {
      (Object.keys(segmentSpecs) as VerifySegmentKey[]).forEach(key => {
        validateSegment(key, segmentInputs[key]);
      });
      return true;
    } catch {
      return false;
    }
  }, [segmentInputs, segmentSpecs, validateSegment]);

  const verifySegments = useMemo<PrivateKeyVerifySegment[]>(
    () =>
      (Object.keys(segmentSpecs) as VerifySegmentKey[]).map(key => ({
        startIndex: segmentSpecs[key].startIndex,
        endIndex: segmentSpecs[key].endIndex,
        value: segmentInputs[key]
      })),
    [segmentInputs, segmentSpecs]
  );

  const verifyPrivateKey = useCallback(async () => {
    if (!isValid) return;

    const command: EnablePrivateKeyCommand = {
      wallet,
      segments: verifySegments
    };

    await enablePrivateKey(command).then(() => {
      enableWallet();
      safeClose();
    });
  }, [enablePrivateKey, enableWallet, isValid, safeClose, verifySegments, wallet]);

  return {
    segmentInputs,
    segmentSpecs,
    isValid,
    isPending,
    error,
    setSegmentValue,
    resetSegmentValue,
    verifyPrivateKey
  };
};

type PrivateKeyVerifyFormProviderProps = { wallet: Address; children: ReactNode };

type PrivateKeyVerifyFormContextType = ReturnType<typeof usePrivateKeyVerifyFormProvider> | undefined;

const PrivateKeyVerifyFormContext = createContext<PrivateKeyVerifyFormContextType | undefined>(undefined);

export const PrivateKeyVerifyFormProvider = (props: PrivateKeyVerifyFormProviderProps) => {
  const { wallet, children } = props;

  const result = usePrivateKeyVerifyFormProvider({ wallet });

  return <PrivateKeyVerifyFormContext.Provider value={result}>{children}</PrivateKeyVerifyFormContext.Provider>;
};

const usePrivateKeyVerifyForm = () => {
  const ctx = useContext(PrivateKeyVerifyFormContext);
  if (!ctx)
    throw new Error(
      "PrivateKeyVerifyFormProvider is not mounted. Wrap your component with <PrivateKeyVerifyFormProvider>."
    );
  return ctx;
};

export default usePrivateKeyVerifyForm;
