import "expo-router/entry";
import "react-native-get-random-values";

import "react-native-url-polyfill/auto";
// @ts-ignore
import { Buffer as NodeBuffer } from "buffer";

if (typeof global.Buffer === "undefined") {
  // @ts-ignore
  global.Buffer = NodeBuffer;
}
