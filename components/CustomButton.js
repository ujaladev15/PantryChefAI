import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import { spacing, radius, fontSizes, fontWeights, shadow } from "../constants/theme";
import { palette } from "../constants/colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * CustomButton
 * variant: "primary" | "secondary" | "outline" | "ghost"
 */
export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  icon = null,
  disabled = false,
  loading = false,
  style,
  fullWidth = true,
}) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.96, { duration: 100 });
  };
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  const content = (
    <>
      {icon}
      <Text
        style={[
          styles.text,
          variant === "outline" || variant === "ghost"
            ? { color: theme.primary }
            : { color: "#FFFFFF" },
        ]}
      >
        {loading ? "Please wait…" : title}
      </Text>
    </>
  );

  if (variant === "primary") {
    return (
      <AnimatedPressable
        disabled={disabled || loading}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[animatedStyle, fullWidth && styles.fullWidth, style]}
      >
        <LinearGradient
          colors={disabled ? ["#CCCCCC", "#BBBBBB"] : [palette.primary, palette.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, shadow(palette.primary)]}
        >
          {content}
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  const variantStyle =
    variant === "outline"
      ? { backgroundColor: "transparent", borderWidth: 1.5, borderColor: theme.primary }
      : variant === "ghost"
      ? { backgroundColor: "transparent" }
      : { backgroundColor: theme.cardAlt };

  return (
    <AnimatedPressable
      disabled={disabled || loading}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        animatedStyle,
        styles.base,
        variantStyle,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {content}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    gap: spacing.sm,
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
});
