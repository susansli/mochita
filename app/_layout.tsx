import { Stack } from "expo-router";

// Index is the entrypoint to the app

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Mochita",
        }}
      />
      <Stack.Screen
        name="tutorial"
        options={{
          headerTitle: "Tutorial",
        }}
      />
      <Stack.Screen
        name="+not-found"
        options={{
          headerTitle: "404: Not Found",
        }}
      />
    </Stack>
  );
}
