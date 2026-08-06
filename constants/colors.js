// Core brand palette used across the whole app.
// Keeping this centralized means every screen / component
// pulls from a single source of truth for theming.

export const palette = {
  primary: "#FF6B35",
  primaryDark: "#E5551F",
  secondary: "#FFA94D",
  accent: "#4CAF50",
  background: "#FAFAFA",
  text: "#1A1A1A",
  card: "#FFFFFF",
  muted: "#8A8A8E",
  border: "#EFEFEF",
  danger: "#E53935",
  star: "#FFB800",
};

export const lightTheme = {
  mode: "light",
  background: "#FAFAFA",
  card: "#FFFFFF",
  cardAlt: "#F4F4F6",
  text: "#1A1A1A",
  textSecondary: "#6E6E73",
  border: "#EFEFEF",
  primary: palette.primary,
  secondary: palette.secondary,
  accent: palette.accent,
  star: palette.star,
  danger: palette.danger,
  shadow: "#000000",
  chip: "#F4F4F6",
  chipActive: palette.primary,
  tabBar: "#FFFFFF",
  statusBar: "dark",
};

export const darkTheme = {
  mode: "dark",
  background: "#121214",
  card: "#1C1C1F",
  cardAlt: "#242428",
  text: "#F5F5F7",
  textSecondary: "#9A9AA1",
  border: "#2B2B30",
  primary: palette.primary,
  secondary: palette.secondary,
  accent: palette.accent,
  star: palette.star,
  danger: "#FF6B6B",
  shadow: "#000000",
  chip: "#242428",
  chipActive: palette.primary,
  tabBar: "#1A1A1D",
  statusBar: "light",
};

export default palette;
