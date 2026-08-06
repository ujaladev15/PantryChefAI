import React from "react";
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoritesContext";
import { spacing, radius, fontSizes, fontWeights, shadow } from "../constants/theme";
import { formatCookTime, truncate } from "../utils/helpers";

const { width } = Dimensions.get("window");

/**
 * RecipeCard
 * layout: "horizontal" (wide, for grid/list) | "compact" (small, for horizontal scrolls)
 */
export default function RecipeCard({ recipe, onPress, layout = "horizontal", index = 0 }) {
  const { theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);

  const cardWidth = layout === "compact" ? width * 0.44 : "100%";

  return (
    <Animated.View entering={FadeInDown.delay(index * 60).duration(400)}>
      <Pressable
        onPress={onPress}
        style={[
          styles.card,
          { backgroundColor: theme.card, width: cardWidth },
          shadow(theme.shadow),
        ]}
      >
        <View style={styles.imageWrap}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <Pressable
            hitSlop={10}
            onPress={(e) => {
              e.stopPropagation?.();
              toggleFavorite(recipe.id);
            }}
            style={styles.favoriteBtn}
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={18}
              color={favorite ? "#FF6B35" : "#FFFFFF"}
            />
          </Pressable>
          {typeof recipe.matchPercent === "number" && (
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>{recipe.matchPercent}% match</Text>
            </View>
          )}
        </View>

        <View style={styles.body}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {recipe.title}
          </Text>
          {layout !== "compact" && (
            <Text style={[styles.desc, { color: theme.textSecondary }]} numberOfLines={2}>
              {truncate(recipe.description, 70)}
            </Text>
          )}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={13} color={theme.textSecondary} />
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                {formatCookTime(recipe.cookTime)}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="star" size={13} color={theme.star} />
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                {recipe.rating}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={13} color={theme.textSecondary} />
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                {recipe.difficulty}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  imageWrap: {
    width: "100%",
    height: 140,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteBtn: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: "rgba(0,0,0,0.35)",
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  matchBadge: {
    position: "absolute",
    bottom: spacing.sm,
    left: spacing.sm,
    backgroundColor: "#4CAF50",
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  matchText: {
    color: "#FFFFFF",
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
  },
  body: {
    padding: spacing.md,
    gap: 4,
  },
  title: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
  desc: {
    fontSize: fontSizes.xs,
    lineHeight: 16,
  },
  metaRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  metaText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
  },
});
