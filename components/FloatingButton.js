import React, { useEffect } from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../constants/colors";
import { radius, shadow } from "../constants/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function FloatingButton({ onPress, icon = "sparkles", bottom = 24 }) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 1200 }),
        withTiming(0, { duration: 1200 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.wrapper, { bottom }, animatedStyle, shadow(palette.primary)]}
    >
      <LinearGradient
        colors={[palette.primary, palette.secondary]}
        style={styles.button}
      >
        <Ionicons name={icon} size={26} color="#FFFFFF" />
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    right: 20,
    borderRadius: radius.pill,
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
});
