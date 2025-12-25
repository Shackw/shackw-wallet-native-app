import { useMemo } from "react";

import { useDensity } from "@/presentation/hooks/useDensity";
import * as D from "@/presentation/styles/twDensity";

export const useTw = () => {
  const { mode, width, height, ratio, scaleNum } = useDensity();

  return useMemo(() => {
    return {
      mode,
      width,
      height,
      ratio,

      scaleNum,

      // padding
      p: (n: number) => D.p(mode, n),
      px: (n: number) => D.px(mode, n),
      py: (n: number) => D.py(mode, n),
      pt: (n: number) => D.pt(mode, n),
      pb: (n: number) => D.pb(mode, n),
      pl: (n: number) => D.pl(mode, n),
      pr: (n: number) => D.pr(mode, n),

      // margin
      m: (n: number) => D.m(mode, n),
      mx: (n: number) => D.mx(mode, n),
      my: (n: number) => D.my(mode, n),
      mt: (n: number) => D.mt(mode, n),
      mb: (n: number) => D.mb(mode, n),
      ml: (n: number) => D.ml(mode, n),
      mr: (n: number) => D.mr(mode, n),

      // gap
      gap: (n: number) => D.gap(mode, n),
      gapX: (n: number) => D.gapX(mode, n),
      gapY: (n: number) => D.gapY(mode, n),

      // size
      w: (n: number) => D.w(mode, n),
      h: (n: number) => D.h(mode, n),
      minW: (n: number) => D.minW(mode, n),
      maxW: (n: number) => D.maxW(mode, n),
      minH: (n: number) => D.minH(mode, n),
      maxH: (n: number) => D.maxH(mode, n),

      // text token -> class
      text: (t: Parameters<typeof D.text>[1]) => D.text(mode, t),

      // input
      input: (t: Parameters<typeof D.input>[1]) => D.input(mode, t)
    };
  }, [mode, width, height, ratio, scaleNum]);
};
