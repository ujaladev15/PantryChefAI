import React, { useEffect } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { spacing, radius, fontSizes, fontWeights } from "../constants/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function IngredientChip({ ingredient, selected, onToggle, size = "md" }) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(selected ? 1.04 : 1, { damping: 10 });
  }, [selected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isSmall = size === "sm";

  return (
    <AnimatedPressable
      onPress={onToggle}
      style={[
        animatedStyle,
        styles.chip,
        isSmall && styles.chipSmall,
        {
          backgroundColor: selected ? theme.chipActive : theme.chip,
          borderColor: selected ? theme.chipActive : theme.border,
        },
      ]}
    >
      <Text style={isSmall ? styles.emojiSmall : styles.emoji}>{ingredient.emoji}</Text>
      <Text
        style={[
          isSmall ? styles.labelSmall : styles.label,
          { color: selected ? "#FFFFFF" : theme.text },
        ]}
        numberOfLines={1}
      >
        {ingredient.name}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    gap: 6,
  },
  chipSmall: {
    paddingVertical: 6,
    paddingHorizontal: spacing.sm + 2,
  },
  emoji: {
    fontSize: 16,
  },
  emojiSmall: {
    fontSize: 13,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
  labelSmall: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
  },
});
