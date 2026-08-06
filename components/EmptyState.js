import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { spacing, fontSizes, fontWeights, radius } from "../constants/theme";
import CustomButton from "./CustomButton";

export default function EmptyState({
  icon = "restaurant-outline",
  title = "Nothing here yet",
  message = "Start exploring to see content appear here.",
  actionLabel,
  onActionPress,
}) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { backgroundColor: theme.cardAlt }]}>
        <Ionicons name={icon} size={40} color={theme.primary} />
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
      {actionLabel && (
        <CustomButton
          title={actionLabel}
          onPress={onActionPress}
          fullWidth={false}
          style={{ marginTop: spacing.lg, paddingHorizontal: spacing.xxl }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.xs,
  },
  message: {
    fontSize: fontSizes.sm,
    textAlign: "center",
    lineHeight: 20,
  },
});
