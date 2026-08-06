import React from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { spacing, radius, fontSizes } from "../constants/theme";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search recipes or ingredients…",
  onFilterPress,
  editable = true,
  onPress,
}) {
  const { theme } = useTheme();

  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      style={[styles.container, { backgroundColor: theme.cardAlt, borderColor: theme.border }]}
    >
      <Ionicons name="search" size={18} color={theme.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { color: theme.text }]}
        editable={editable}
        pointerEvents={onPress ? "none" : "auto"}
      />
      {onFilterPress && (
        <Pressable onPress={onFilterPress} hitSlop={8}>
          <Ionicons name="options-outline" size={20} color={theme.primary} />
        </Pressable>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.sm,
  },
});
