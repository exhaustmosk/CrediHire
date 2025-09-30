import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Redirect everything to the (student) stack for now */}
      <Stack.Screen name="(student)" options={{ headerShown: false }} />
    </Stack>
  );
}
