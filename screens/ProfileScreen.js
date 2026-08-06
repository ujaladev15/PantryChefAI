import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { useFavorites } from "../context/FavoritesContext";
import { spacing, fontSizes, fontWeights, radius, shadow } from "../constants/theme";
import Avatar from "../components/Avatar";

const ACHIEVEMENTS = [
  { key: "first", title: "First Recipe", icon: "ribbon-outline", earned: true },
  { key: "streak7", title: "7-Day Streak", icon: "flame-outline", earned: true },
  { key: "saver", title: "Recipe Saver", icon: "bookmark-outline", earned: true },
  { key: "explorer", title: "Ingredient Explorer", icon: "compass-outline", earned: false },
];

const SETTINGS_ITEMS = [
  { key: "account", label: "Account Details", icon: "person-circle-outline" },
  { key: "notifications", label: "Notifications", icon: "notifications-outline" },
  { key: "privacy", label: "Privacy & Security", icon: "shield-checkmark-outline" },
  { key: "help", label: "Help & Support", icon: "help-circle-outline" },
];

export default function ProfileScreen() {
  const { theme, isDark, toggleDarkMode } = useTheme();
  const { user, logout } = useUser();
  const { favoriteIds } = useFavorites();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <Avatar name={user?.name} size={72} />
          <Text style={[styles.name, { color: theme.text }]}>{user?.name || "Guest Chef"}</Text>
          {user?.email && (
            <Text style={[styles.email, { color: theme.textSecondary }]}>{user.email}</Text>
          )}
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: theme.card }, shadow(theme.shadow)]}>
            <Text style={[styles.statValue, { color: theme.primary }]}>{favoriteIds.length}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Saved Recipes</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.card }, shadow(theme.shadow)]}>
            <Text style={[styles.statValue, { color: theme.primary }]}>{user?.streak ?? 0} 🔥</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Cooking Streak</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.card }, shadow(theme.shadow)]}>
            <Text style={[styles.statValue, { color: theme.primary }]}>
              {ACHIEVEMENTS.filter((a) => a.earned).length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Achievements</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {ACHIEVEMENTS.map((a) => (
              <View
                key={a.key}
                style={[
                  styles.achievementCard,
                  { backgroundColor: theme.card, opacity: a.earned ? 1 : 0.4 },
                  shadow(theme.shadow),
                ]}
              >
                <View style={[styles.achievementIcon, { backgroundColor: theme.cardAlt }]}>
                  <Ionicons name={a.icon} size={22} color={theme.primary} />
                </View>
                <Text style={[styles.achievementTitle, { color: theme.text }]}>{a.title}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Settings</Text>
          <View style={[styles.settingsCard, { backgroundColor: theme.card }, shadow(theme.shadow)]}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="moon-outline" size={20} color={theme.text} />
                <Text style={[styles.settingLabel, { color: theme.text }]}>Dark Mode</Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleDarkMode}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            {SETTINGS_ITEMS.map((item) => (
              <Pressable key={item.key} style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: theme.border }]}>
                <View style={styles.settingLeft}>
                  <Ionicons name={item.icon} size={20} color={theme.text} />
                  <Text style={[styles.settingLabel, { color: theme.text }]}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          style={[styles.logoutBtn, { borderColor: theme.danger }]}
          onPress={logout}
        >
          <Ionicons name="log-out-outline" size={18} color={theme.danger} />
          <Text style={[styles.logoutText, { color: theme.danger }]}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: spacing.xl, marginBottom: spacing.lg },
  headerTitle: { fontSize: fontSizes.xl, fontWeight: fontWeights.extrabold },
  profileCard: { alignItems: "center", marginBottom: spacing.xl, gap: 4 },
  name: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, marginTop: spacing.sm },
  email: { fontSize: fontSizes.xs },
  statsRow: { flexDirection: "row", gap: spacing.md, paddingHorizontal: spacing.xl, marginBottom: spacing.xxl },
  statCard: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
    gap: 4,
  },
  statValue: { fontSize: fontSizes.lg, fontWeight: fontWeights.extrabold },
  statLabel: { fontSize: 10, textAlign: "center", fontWeight: fontWeights.medium },
  section: { paddingHorizontal: spacing.xl, marginBottom: spacing.xxl },
  sectionTitle: { fontSize: fontSizes.md, fontWeight: fontWeights.bold, marginBottom: spacing.md },
  achievementsGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  achievementCard: {
    width: "47%",
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  achievementTitle: { fontSize: fontSizes.xs, fontWeight: fontWeights.semibold },
  settingsCard: { borderRadius: radius.md, overflow: "hidden" },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  settingLeft: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  settingLabel: { fontSize: fontSizes.sm, fontWeight: fontWeights.medium },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1.5,
  },
  logoutText: { fontSize: fontSizes.sm, fontWeight: fontWeights.bold },
});
