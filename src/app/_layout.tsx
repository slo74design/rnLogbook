import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import "../global.css";
import { useStore } from "../store/useStore";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { hasCompletedOnboarding, resetOnboarding } = useStore();

  useEffect(() => {
    const third = setTimeout(() => {
      console.log("Resetting onboarding state");
      resetOnboarding();
    }, 1000);

    return () => {
      clearTimeout(third);
    };
  }, [resetOnboarding]);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    WorkSans: require("../assets/fonts/WorkSans-Regular.ttf"),
    WorkSansBold: require("../assets/fonts/WorkSans-Bold.ttf"),
    WorkSansBlack: require("../assets/fonts/WorkSans-Black.ttf"),
    WorkSansLight: require("../assets/fonts/WorkSans-Light.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="light" />
      <Stack>
        <Stack.Protected guard={hasCompletedOnboarding}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen
            name="(onboarding)/index"
            options={{ headerShown: false }}
          />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
