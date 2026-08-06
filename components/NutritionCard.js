import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { spacing, radius, fontSizes, fontWeights } from "../constants/theme";

const ITEMS = [
  { key: "calories", label: "Calories", unit: "kcal", color: "#FF6B35" },
  { key: "protein", label: "Protein", unit: "g", color: "#4CAF50" },
  { key: "carbs", label: "Carbs", unit: "g", color: "#FFA94D" },
  { key: "fat", label: "Fat", unit: "g", color: "#5C7CFA" },
];

export default function NutritionCard({ nutrition }) {
  const { theme } = useTheme();

  return (
    <View style={styles.row}>
      {ITEMS.map((item) => (
        <View key={item.key} style={[styles.item, { backgroundColor: theme.cardAlt }]}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={[styles.value, { color: theme.text }]}>
            {nutrition[item.key]}
            <Text style={styles.unit}>{item.unit}</Text>
          </Text>
          <Text style={[styles.label, { color: theme.textSecondary }]}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  item: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "flex-start",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
  },
  unit: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
  },
  label: {
    fontSize: fontSizes.xs,
    marginTop: 2,
  },
});
