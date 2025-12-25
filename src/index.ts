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

import { Text, TextInput } from "react-native";

const AnyText = Text as any;
const AnyTextInput = TextInput as any;

AnyText.defaultProps ??= {};
AnyTextInput.defaultProps ??= {};

AnyText.defaultProps.allowFontScaling = false;
AnyTextInput.defaultProps.allowFontScaling = false;

import "expo-router/entry";
