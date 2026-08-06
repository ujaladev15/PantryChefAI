import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { spacing, fontSizes, fontWeights } from "../constants/theme";

export default function SectionHeader({ title, actionLabel, onActionPress, subtitle }) {
  const { theme } = useTheme();

  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
        )}
      </View>
      {actionLabel && (
        <Pressable onPress={onActionPress} hitSlop={8}>
          <Text style={[styles.action, { color: theme.primary }]}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
  },
  subtitle: {
    fontSize: fontSizes.xs,
    marginTop: 2,
  },
  action: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  },
});
