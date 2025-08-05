import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(onboarding)/index"
          options={{
            // headerShown: false,
            title: "Onboarding",
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#333" : "#0c4a6e",
            },
            headerTintColor: colorScheme === "dark" ? "#fff" : "#fff",
          }}
        />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
