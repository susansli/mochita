import { Stack } from "expo-router";

// Index is the entrypoint to the app

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="pages/index"
        options={{
          headerTitle: "Mochita",
        }}
      />
      <Stack.Screen
        name="pages/tutorial"
        options={{
          headerTitle: "Tutorial",
        }}
      />
    </Stack>
  );
}
