import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { spacing, fontSizes, fontWeights, radius } from "../constants/theme";
import { getGreeting } from "../utils/helpers";
import { getAllIngredients, getAllRecipes, fetchPopularRecipes } from "../services/recipeService";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import RecipeCard from "../components/RecipeCard";
import IngredientChip from "../components/IngredientChip";
import FloatingButton from "../components/FloatingButton";
import Avatar from "../components/Avatar";
import { ListSkeleton } from "../components/LoadingSkeleton";

const QUICK_ACTIONS = [
  { key: "ingredients", label: "My Ingredients", icon: "basket-outline" },
  { key: "favorites", label: "Favorites", icon: "heart-outline" },
  { key: "trending", label: "Trending", icon: "trending-up-outline" },
  { key: "quick", label: "Quick Meals", icon: "flash-outline" },
];

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const { user } = useUser();
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const ingredients = getAllIngredients().slice(0, 12);
  const allRecipes = getAllRecipes();
  const recommended = allRecipes.slice(4, 10);

  const load = useCallback(() => {
    setLoading(true);
    fetchPopularRecipes().then((data) => {
      setPopular(data);
      setLoading(false);
    });
    setRecentlyViewed(allRecipes.slice(10, 14));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPopularRecipes().then((data) => {
      setPopular(data);
      setRefreshing(false);
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.textSecondary }]}>
              {getGreeting()} {user?.guest ? "" : "👋"}
            </Text>
            <Text style={[styles.name, { color: theme.text }]}>
              {user?.name || "Chef"}
            </Text>
          </View>
          <Pressable onPress={() => navigation.navigate("ProfileTab")}>
            <Avatar name={user?.name} size={48} />
          </Pressable>
        </View>

        <View style={styles.searchWrap}>
          <SearchBar
            value=""
            onChangeText={() => {}}
            onPress={() => navigation.navigate("IngredientSelection")}
            placeholder="What's in your kitchen today?"
          />
        </View>

        <FlatList
          data={ingredients}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chipsRow}
          renderItem={({ item }) => (
            <View style={{ marginRight: spacing.sm }}>
              <IngredientChip ingredient={item} selected={false} onToggle={() => navigation.navigate("IngredientSelection")} size="sm" />
            </View>
          )}
        />

        <View style={styles.quickActionsRow}>
          {QUICK_ACTIONS.map((action) => (
            <Pressable
              key={action.key}
              style={[styles.quickAction, { backgroundColor: theme.card }]}
              onPress={() => {
                if (action.key === "favorites") navigation.navigate("FavoritesTab");
                else if (action.key === "ingredients") navigation.navigate("IngredientSelection");
              }}
            >
              <View style={[styles.quickIconWrap, { backgroundColor: theme.cardAlt }]}>
                <Ionicons name={action.icon} size={20} color={theme.primary} />
              </View>
              <Text style={[styles.quickLabel, { color: theme.text }]}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Popular Right Now"
            actionLabel="See all"
            onActionPress={() => navigation.navigate("Favorites")}
          />
          {loading ? (
            <FlatList
              data={popular.length ? popular : [1, 2]}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, i) => `skeleton-${i}`}
              renderItem={() => <View style={{ marginRight: spacing.md }}><ListSkeleton count={1} /></View>}
            />
          ) : (
            <FlatList
              data={popular}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View style={{ marginRight: spacing.md }}>
                  <RecipeCard
                    recipe={item}
                    layout="compact"
                    index={index}
                    onPress={() => navigation.navigate("RecipeDetails", { recipeId: item.id })}
                  />
                </View>
              )}
            />
          )}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Recommended for You" subtitle="Based on your recent activity" />
          {recommended.map((item, index) => (
            <RecipeCard
              key={item.id}
              recipe={item}
              index={index}
              onPress={() => navigation.navigate("RecipeDetails", { recipeId: item.id })}
            />
          ))}
        </View>

        {recentlyViewed.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Recently Viewed" />
            <FlatList
              data={recentlyViewed}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View style={{ marginRight: spacing.md }}>
                  <RecipeCard
                    recipe={item}
                    layout="compact"
                    index={index}
                    onPress={() => navigation.navigate("RecipeDetails", { recipeId: item.id })}
                  />
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>

      <FloatingButton onPress={() => navigation.navigate("IngredientSelection")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  greeting: { fontSize: fontSizes.sm, fontWeight: fontWeights.medium },
  name: { fontSize: fontSizes.xl, fontWeight: fontWeights.extrabold, marginTop: 2 },
  searchWrap: { paddingHorizontal: spacing.xl, marginBottom: spacing.lg },
  chipsRow: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xxl,
  },
  quickAction: {
    alignItems: "center",
    width: "23%",
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    gap: 6,
  },
  quickIconWrap: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLabel: { fontSize: 10, fontWeight: fontWeights.medium, textAlign: "center" },
  section: { paddingHorizontal: spacing.xl, marginBottom: spacing.xxl },
});
