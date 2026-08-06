import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { radius, spacing } from "../constants/theme";

function ShimmerBlock({ style }) {
  const { theme } = useTheme();
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[{ backgroundColor: theme.cardAlt, borderRadius: radius.md }, style, animatedStyle]}
    />
  );
}

/** A card-shaped loading skeleton mirroring RecipeCard's layout. */
export function RecipeCardSkeleton() {
  const { theme } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <ShimmerBlock style={styles.image} />
      <View style={{ padding: spacing.md, gap: spacing.sm }}>
        <ShimmerBlock style={{ height: 16, width: "70%" }} />
        <ShimmerBlock style={{ height: 12, width: "90%" }} />
        <ShimmerBlock style={{ height: 12, width: "40%" }} />
      </View>
    </View>
  );
}

export function ListSkeleton({ count = 4 }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 0,
  },
});

export default ShimmerBlock;
