import { firebase, getToken } from "@react-native-firebase/app-check";

export const initAppCheck = async () => {
  try {
    const appCheck = firebase.appCheck();

    const provider = appCheck.newReactNativeFirebaseAppCheckProvider();
    provider.configure({
      android: {
        provider: "playIntegrity"
      },
      apple: {
        provider: __DEV__ ? "debug" : "appAttestWithDeviceCheckFallback",
        debugToken: process.env.EXPO_PUBLIC_FIREBASE_APP_CHECK_DEBUG_TOKEN
      }
    });

    await appCheck.initializeAppCheck({
      provider,
      isTokenAutoRefreshEnabled: true
    });

    const { token } = await getToken(appCheck);
    return token;
  } catch (e) {
    console.error(e);
    throw new Error("AppCheckの初期化に失敗しました。");
  }
};
