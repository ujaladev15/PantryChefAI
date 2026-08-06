import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import IngredientSelectionScreen from "../screens/IngredientSelectionScreen";
import { shadow } from "../constants/theme";

const Tab = createBottomTabNavigator();

const ICONS = {
  HomeTab: "home",
  IngredientsTab: "basket",
  FavoritesTab: "heart",
  ProfileTab: "person",
};

function TabIcon({ routeName, focused, color }) {
  const name = ICONS[routeName] || "ellipse";
  return (
    <View style={styles.iconWrap}>
      <Ionicons name={focused ? name : `${name}-outline`} size={22} color={color} />
      {focused && <View style={[styles.dot, { backgroundColor: color }]} />}
    </View>
  );
}

export default function MainTabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: [
          styles.tabBar,
          { backgroundColor: theme.tabBar, borderTopColor: theme.border },
          shadow(theme.shadow),
        ],
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ focused, color }) => (
          <TabIcon routeName={route.name} focused={focused} color={color} />
        ),
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen
        name="IngredientsTab"
        component={IngredientSelectionScreen}
        options={{ title: "Ingredients" }}
      />
      <Tab.Screen name="FavoritesTab" component={FavoritesScreen} options={{ title: "Favorites" }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 84,
    paddingTop: 8,
    paddingBottom: 24,
    borderTopWidth: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
