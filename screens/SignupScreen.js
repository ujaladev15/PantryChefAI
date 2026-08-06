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
import CustomButton from "../components/CustomButton";

export default function SignupScreen({ navigation }) {
  const { theme } = useTheme();
  const { login } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setTimeout(async () => {
      await login({ name, email });
      setLoading(false);
    }, 800);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
            <Ionicons name="chevron-back" size={22} color={theme.text} />
          </Pressable>

          <Animated.View entering={FadeInUp.duration(400)}>
            <Text style={styles.emoji}>🍽️</Text>
            <Text style={[styles.heading, { color: theme.text }]}>Create your account</Text>
            <Text style={[styles.subheading, { color: theme.textSecondary }]}>
              Join PantryChef AI and start cooking smarter today.
            </Text>
          </Animated.View>

          <View style={styles.form}>
            <View style={[styles.inputWrap, { backgroundColor: theme.cardAlt, borderColor: theme.border }]}>
              <Ionicons name="person-outline" size={18} color={theme.textSecondary} />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Full name"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { color: theme.text }]}
              />
            </View>

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
                placeholder="Create a password"
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

            <Text style={[styles.terms, { color: theme.textSecondary }]}>
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </Text>

            <CustomButton title="Create Account" onPress={handleSignup} loading={loading} />
          </View>

          <View style={styles.footerRow}>
            <Text style={{ color: theme.textSecondary }}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: theme.primary, fontWeight: fontWeights.semibold }}>Log in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: spacing.xl, paddingTop: spacing.md, flexGrow: 1 },
  backBtn: { marginBottom: spacing.lg, width: 36, height: 36, justifyContent: "center" },
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
  terms: { fontSize: fontSizes.xs, lineHeight: 16, marginBottom: spacing.xs },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: spacing.xxl },
});
