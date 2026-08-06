import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { spacing, radius, fontSizes, fontWeights } from "../constants/theme";
import { palette } from "../constants/colors";
import CustomButton from "../components/CustomButton";

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(async () => {
      await login({ email });
      setLoading(false);
    }, 800);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Animated.View entering={FadeInUp.duration(400)}>
            <Text style={styles.emoji}>👋</Text>
            <Text style={[styles.heading, { color: theme.text }]}>Welcome back</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              Log in to pick up where you left off in the kitchen.
            </Text>
          </Animated.View>

          <View style={styles.form}>
            <View style={[styles.inputWrap, { backgroundColor: theme.cardAlt, borderColor: theme.border }]}>
              <Ionicons name="mail-outline" size={18} color={theme.textSecondary} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="none"
                keyboardType="email-address"
                style={[styles.input, { color: theme.text }]}
              />
            </View>

            <View style={[styles.inputWrap, { backgroundColor: theme.cardAlt, borderColor: theme.border }]}>
              <Ionicons name="lock-closed-outline" size={18} color={theme.textSecondary} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry={!showPassword}
                style={[styles.input, { color: theme.text }]}
              />
              <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color={theme.textSecondary}
                />
              </Pressable>
            </View>

            <View style={styles.optionsRow}>
              <Pressable style={styles.rememberRow} onPress={() => setRememberMe((v) => !v)}>
                <Ionicons
                  name={rememberMe ? "checkbox" : "square-outline"}
                  size={18}
                  color={rememberMe ? theme.primary : theme.textSecondary}
                />
                <Text style={[styles.rememberText, { color: theme.textSecondary }]}>
                  Remember me
                </Text>
              </Pressable>
              <Pressable hitSlop={8}>
                <Text style={[styles.forgotText, { color: theme.primary }]}>Forgot password?</Text>
              </Pressable>
            </View>

            <CustomButton
              title="Log In"
              onPress={handleLogin}
              loading={loading}
              style={{ marginTop: spacing.md }}
            />

            <View style={styles.dividerRow}>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              <Text style={[styles.dividerText, { color: theme.textSecondary }]}>or continue with</Text>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
            </View>

            <View style={styles.socialRow}>
              <Pressable style={[styles.socialBtn, { backgroundColor: theme.cardAlt }]}>
                <Ionicons name="logo-google" size={20} color={theme.text} />
              </Pressable>
              <Pressable style={[styles.socialBtn, { backgroundColor: theme.cardAlt }]}>
                <Ionicons name="logo-apple" size={20} color={theme.text} />
              </Pressable>
              <Pressable style={[styles.socialBtn, { backgroundColor: theme.cardAlt }]}>
                <Ionicons name="logo-facebook" size={20} color={theme.text} />
              </Pressable>
            </View>

            <CustomButton
              title="Continue as Guest"
              variant="ghost"
              onPress={() => login({ guest: true })}
              style={{ marginTop: spacing.sm }}
            />
          </View>

          <View style={styles.footerRow}>
            <Text style={{ color: theme.textSecondary }}>Don't have an account? </Text>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text style={{ color: theme.primary, fontWeight: fontWeights.semibold }}>
                Sign up
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: spacing.xl, paddingTop: spacing.xxl, flexGrow: 1 },
  emoji: { fontSize: 40, marginBottom: spacing.sm },
  heading: { fontSize: fontSizes.xxl, fontWeight: fontWeights.extrabold },
  subheading: { fontSize: fontSizes.sm, marginTop: spacing.xs, marginBottom: spacing.xl, lineHeight: 20 },
  form: { gap: spacing.md },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  input: { flex: 1, paddingVertical: spacing.md, fontSize: fontSizes.sm },
  optionsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rememberRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  rememberText: { fontSize: fontSizes.xs },
  forgotText: { fontSize: fontSizes.xs, fontWeight: fontWeights.semibold },
  dividerRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginVertical: spacing.sm },
  divider: { flex: 1, height: 1 },
  dividerText: { fontSize: fontSizes.xs },
  socialRow: { flexDirection: "row", gap: spacing.md, justifyContent: "center" },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.xxl,
  },
});
