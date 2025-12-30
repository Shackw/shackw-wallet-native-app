import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

import { DENSITY, getLayoutMode } from "@/presentation/styles/density";
import { clamp } from "@/shared/helpers/cn";

export const useDensity = () => {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const mode = getLayoutMode(width);
    const cfg = DENSITY[mode];

    const baseWidth = 420;
    const rawRatio = width / baseWidth;

    const ratio = clamp(rawRatio, 0.85, 1.15);

    const scale = (n: number) => Math.round(n * ratio);
    const scaleNum = (n: number) => Math.round(n * cfg.numScale * ratio);
    const scaleSpace = (n: number) => Math.round(n * cfg.spaceScale * ratio);

    return {
      width,
      height,
      mode,
      cfg,

      // new
      baseWidth,
      ratio,
      scale,
      scaleNum,
      scaleSpace
    };
  }, [width, height]);
};
