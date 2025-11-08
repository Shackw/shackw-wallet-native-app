import { AppBarProps } from "..";

import AppBarDefaultBody from "./AppBarDefaultBody";
import AppBarOverlayBody from "./AppBarOverlayBody";

const AppBarBody = ({ title }: AppBarProps) => {
  if (title) return <AppBarOverlayBody title={title} />;
  return <AppBarDefaultBody />;
};

export default AppBarBody;
