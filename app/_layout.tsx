import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import "react-native-gesture-handler"; // if you use RNGH (Reusables does)
import { NotifierWrapper } from "react-native-notifier";
import "react-native-reanimated";
import { NAV_THEME } from "../lib/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Directive to make RNU doctor happy
if (Platform.OS === "web") {
  require("../global.css");
}

// Index is the entrypoint to the app (like App.tsx)

export default function RootLayout() {
  const colorScheme = "light";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={NAV_THEME[colorScheme]}>
        <PortalHost />
        <NotifierWrapper>
          <Stack>
            <Stack.Screen name="pages/index" options={{ headerShown: false }} />
            <Stack.Screen
              name="pages/tutorial"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="pages/goals" options={{ headerShown: false }} />
            <Stack.Screen name="pages/bag" options={{ headerShown: false }} />
          </Stack>
        </NotifierWrapper>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
