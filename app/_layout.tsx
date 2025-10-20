import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { NAV_THEME } from "../lib/theme";
import 'react-native-gesture-handler'; // if you use RNGH (Reusables does)
import 'react-native-reanimated';

// Directive to make RNU doctor happy
if (Platform.OS === "web") {
  require("../global.css");
}

// Index is the entrypoint to the app (like App.tsx)

export default function RootLayout() {
  const colorScheme = "light";

  return (
    <ThemeProvider value={NAV_THEME[colorScheme]}>
      <Stack>
        <Stack.Screen name="pages/index" options={{ headerShown: false }} />
        <Stack.Screen name="pages/tutorial" options={{ headerShown: false }} />
        <Stack.Screen name="pages/goals" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}
