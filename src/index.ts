/* eslint-disable import/first */
import "@walletconnect/react-native-compat";
import "react-native-get-random-values";
import "fast-text-encoding";
import "react-native-url-polyfill/auto";

// @ts-ignore
import { Buffer as NodeBuffer } from "buffer";

if (typeof global.Buffer === "undefined") {
  // @ts-ignore
  global.Buffer = NodeBuffer;
}

import "expo-router/entry";
