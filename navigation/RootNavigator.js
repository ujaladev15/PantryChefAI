import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";
import IngredientSelectionScreen from "../screens/IngredientSelectionScreen";
import AIRecommendationScreen from "../screens/AIRecommendationScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { theme, isDark } = useTheme();
  const { isAuthenticated } = useUser();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      primary: theme.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen
              name="IngredientSelection"
              component={IngredientSelectionScreen}
              options={{ presentation: "card" }}
            />
            <Stack.Screen
              name="AIRecommendation"
              component={AIRecommendationScreen}
              options={{ presentation: "card" }}
            />
            <Stack.Screen
              name="RecipeDetails"
              component={RecipeDetailsScreen}
              options={{ presentation: "card" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
