import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import RNQRCode from "react-native-qrcode-svg";

import { ENV } from "@/config/env";
import { useBoolean } from "@/presentation/hooks/useBoolean";

import type Svg from "react-native-svg";

type QRCodeProps = { path: string; query: object; size: number };

export type QRCodeHandle = { handleShare: () => Promise<void> };

const QRCode = forwardRef<QRCodeHandle, QRCodeProps>((props, ref) => {
  const { size, path, query } = props;
  const [isSharing, setIsSharing] = useBoolean(false);

  const qrRef = useRef<Svg>(null);

  const value = useMemo(() => {
    const url = new URL(path, `${ENV.SHACKW_UNIVERSAL_LINK}`);
    for (const [key, v] of Object.entries(query)) if (!!v) url.searchParams.set(key, String(v));

    return url.toString();
  }, [path, query]);

  const handleShare = useCallback(async () => {
    if (isSharing) return;

    setIsSharing.on();
    try {
      qrRef.current?.toDataURL(async data => {
        const file = new File(Paths.cache, "qrcode.png");
        file.create({ overwrite: true });
        file.write(data, { encoding: "base64" });

        const isAvailable = await Sharing.isAvailableAsync();
        if (!isAvailable) throw new Error("共有機能が利用できません");

        await Sharing.shareAsync(file.uri, {
          mimeType: "image/png",
          dialogTitle: "QRコードを共有",
          UTI: "public.png"
        });
      });
    } catch {
      throw new Error("QRコードの共有に失敗しました。");
    } finally {
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsSharing.off();
    }
  }, [isSharing, setIsSharing]);

  useImperativeHandle(ref, () => ({ handleShare }), [handleShare]);

  return (
    <RNQRCode
      logoMargin={-8}
      logoSize={50}
      logoBorderRadius={100}
      quietZone={8}
      logo={require("@/presentation/assets/images/splash.png")}
      value={value}
      size={size}
      ecl="M"
      backgroundColor="#fff"
      getRef={ref => (qrRef.current = ref!)}
    />
  );
});

QRCode.displayName = "QRCode";

export default QRCode;
