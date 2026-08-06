import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { radius, spacing, fontSizes, fontWeights, shadow } from "../constants/theme";

export default function Snackbar({ visible, message, onHide, duration = 2200 }) {
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withTiming(0, { duration: 200 });
      const timer = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 250 });
        translateY.value = withTiming(20, { duration: 250 });
        if (onHide) setTimeout(onHide, 260);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { bottom: insets.bottom + 20 }, animatedStyle, shadow("#000")]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: spacing.xl,
    right: spacing.xl,
    backgroundColor: "#1A1A1A",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
});
