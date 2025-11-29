import { useCameraPermissions, type BarcodeScanningResult, Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { RelativePathString, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";

import { useBoolean } from "@/presentation/hooks/useBoolean";
import { redirectSystemPath } from "@/shared/helpers/redirectSystemPath";

const useSacnQrCode = () => {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const [isError, setIsError] = useBoolean();
  const [isScanning, setIsScanning] = useBoolean(false);

  useEffect(() => {
    if (permission?.granted === false) requestPermission();
  }, [permission, requestPermission]);

  const processValue = useCallback(
    async (value: string) => {
      try {
        if (/^https?:\/\//i.test(value)) {
          const href = await redirectSystemPath(value);
          router.replace(href as RelativePathString);
          return;
        }

        router.replace("/");
      } finally {
        setIsScanning.off();
      }
    },
    [router, setIsScanning]
  );

  const handleScan = useCallback(
    async (result: BarcodeScanningResult) => {
      if (isScanning) return;
      setIsScanning.on();

      const value = result.data ?? result.raw;
      if (!value) {
        setIsScanning.off();
        return;
      }

      await processValue(value);
    },
    [isScanning, processValue, setIsScanning]
  );

  const onBarcodeScanned = useCallback(
    (r: BarcodeScanningResult) => {
      void handleScan(r);
    },
    [handleScan]
  );

  const handlePickImageAndScan = useCallback(async () => {
    if (isScanning) return;
    setIsScanning.on();

    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
      });

      if (res.canceled) {
        setIsScanning.off();
        return;
      }

      const uri = res.assets?.[0]?.uri;
      if (!uri) {
        setIsScanning.off();
        return;
      }

      const results = await Camera.scanFromURLAsync(uri, ["qr"]);

      const first = results?.[0];
      if (!first?.data) {
        setIsError.on();
        setIsScanning.off();
        return;
      }

      await processValue(first.data);
    } catch {
      setIsError.on();
      setIsScanning.off();
    }
  }, [isScanning, setIsScanning, setIsError, processValue]);

  return {
    permission,
    isScanning,
    isError,
    setIsError,
    onBarcodeScanned,
    handlePickImageAndScan
  };
};

export default useSacnQrCode;
