import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { spacing, fontSizes, fontWeights, radius, shadow } from "../constants/theme";
import { fetchRecommendedRecipes } from "../services/recipeService";
import { formatCookTime } from "../utils/helpers";
import { ListSkeleton } from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";

export default function AIRecommendationScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { selectedIngredientIds = [] } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchRecommendedRecipes(selectedIngredientIds).then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, [selectedIngredientIds]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={["top"]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>AI Recommendations</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <Animated.View entering={FadeIn} style={[styles.aiBanner, { backgroundColor: theme.cardAlt }]}>
            <Ionicons name="sparkles" size={18} color={theme.primary} />
            <Text style={[styles.aiBannerText, { color: theme.text }]}>
              Analyzing {selectedIngredientIds.length} ingredients with AI…
            </Text>
          </Animated.View>
          <View style={{ paddingHorizontal: spacing.xl }}>
            <ListSkeleton count={3} />
          </View>
        </View>
      ) : results.length === 0 ? (
        <EmptyState
          icon="sad-outline"
          title="No matches found"
          message="We couldn't find recipes matching those ingredients. Try selecting a few more."
          actionLabel="Adjust Ingredients"
          onActionPress={() => navigation.goBack()}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.xl, paddingTop: 0 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={[styles.aiBanner, { backgroundColor: theme.cardAlt, marginBottom: spacing.lg }]}>
              <Ionicons name="sparkles" size={18} color={theme.primary} />
              <Text style={[styles.aiBannerText, { color: theme.text }]}>
                Found {results.length} recipes matching your ingredients
              </Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(index * 80).duration(400)}>
              <Pressable
                style={[styles.card, { backgroundColor: theme.card }, shadow(theme.shadow)]}
                onPress={() => navigation.navigate("RecipeDetails", { recipeId: item.id })}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.cardBody}>
                  <View style={styles.titleRow}>
                    <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <View style={[styles.matchPill, { backgroundColor: theme.accent }]}>
                      <Text style={styles.matchPillText}>{item.matchPercent}%</Text>
                    </View>
                  </View>

                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={13} color={theme.textSecondary} />
                      <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                        {formatCookTime(item.cookTime)}
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="flame-outline" size={13} color={theme.textSecondary} />
                      <Text style={[styles.metaText, { color: theme.textSecondary }]}>{item.difficulty}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="fitness-outline" size={13} color={theme.textSecondary} />
                      <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                        {item.nutrition.calories} cal
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="star" size={13} color={theme.star} />
                      <Text style={[styles.metaText, { color: theme.textSecondary }]}>{item.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.chipsRow}>
                    <View style={[styles.tag, { backgroundColor: theme.accent + "22" }]}>
                      <Text style={[styles.tagText, { color: theme.accent }]}>
                        {item.availableCount} you have
                      </Text>
                    </View>
                    {item.missing.length > 0 && (
                      <View style={[styles.tag, { backgroundColor: theme.primary + "22" }]}>
                        <Text style={[styles.tagText, { color: theme.primary }]}>
                          {item.missing.length} missing
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={[styles.reasonBox, { backgroundColor: theme.cardAlt }]}>
                    <Ionicons name="bulb-outline" size={14} color={theme.primary} />
                    <Text style={[styles.reasonText, { color: theme.textSecondary }]} numberOfLines={2}>
                      {item.aiReason}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold },
  loadingWrap: { flex: 1 },
  aiBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginHorizontal: spacing.xl,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
  },
  aiBannerText: { fontSize: fontSizes.xs, fontWeight: fontWeights.medium, flex: 1 },
  card: {
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  image: { width: "100%", height: 150 },
  cardBody: { padding: spacing.md, gap: spacing.sm },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: fontSizes.md, fontWeight: fontWeights.bold, flex: 1, marginRight: spacing.sm },
  matchPill: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill },
  matchPillText: { color: "#FFFFFF", fontSize: fontSizes.xs, fontWeight: fontWeights.bold },
  metaRow: { flexDirection: "row", gap: spacing.md, flexWrap: "wrap" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 3 },
  metaText: { fontSize: fontSizes.xs, fontWeight: fontWeights.medium },
  chipsRow: { flexDirection: "row", gap: spacing.sm },
  tag: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill },
  tagText: { fontSize: fontSizes.xs, fontWeight: fontWeights.semibold },
  reasonBox: {
    flexDirection: "row",
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.sm,
    alignItems: "flex-start",
  },
  reasonText: { fontSize: fontSizes.xs, flex: 1, lineHeight: 16 },
});
