import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { FavoritesProvider } from "./context/FavoritesContext";

import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import RootNavigator from "./navigation/RootNavigator";

// Inner component so it can read theme/context (providers wrap this).
function AppContent() {
  const { theme, ready } = useTheme();
  const [showSplash, setShowSplash] = useState(true);
  const [onboarded, setOnboarded] = useState(null); // null = unknown, true/false once checked

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("@pantrychef_onboarded");
        setOnboarded(value === "true");
      } catch (e) {
        setOnboarded(false);
      }
    })();
  }, []);

  if (showSplash || !ready || onboarded === null) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!onboarded) {
    return <OnboardingScreen onComplete={() => setOnboarded(true)} />;
  }

  return (
    <>
      <StatusBar style={theme.statusBar === "dark" ? "dark" : "light"} />
      <RootNavigator />
    </>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <UserProvider>
            <FavoritesProvider>
              <AppContent />
            </FavoritesProvider>
          </UserProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
