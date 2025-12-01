import { getApp } from "@react-native-firebase/app";
import { ReactNativeFirebaseAppCheckProvider, getToken, initializeAppCheck } from "@react-native-firebase/app-check";

export const initAppCheck = async () => {
  try {
    const provider = new ReactNativeFirebaseAppCheckProvider();
    provider.configure({
      android: {
        provider: "playIntegrity"
      },
      apple: {
        provider: __DEV__ ? "debug" : "appAttestWithDeviceCheckFallback",
        debugToken: process.env.EXPO_PUBLIC_FIREBASE_APP_CHECK_DEBUG_TOKEN
      }
    });

    const appCheck = await initializeAppCheck(getApp(), {
      provider,
      isTokenAutoRefreshEnabled: true
    });

    const { token } = await getToken(appCheck, true);
    return token;
  } catch (e) {
    console.error(e);
    throw new Error("AppCheckの初期化に失敗しました。");
  }
};
