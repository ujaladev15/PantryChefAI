// import React, { useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withSequence,
//   Easing,
//   runOnJS,
// } from "react-native-reanimated";
// import { palette } from "../constants/colors";
// import { fontSizes, fontWeights, spacing } from "../constants/theme";

// export default function SplashScreen({ onFinish }) {
//   const scale = useSharedValue(0.7);
//   const opacity = useSharedValue(0);
//   const tagOpacity = useSharedValue(0);

//   useEffect(() => {
//     scale.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.exp) });
//     opacity.value = withTiming(1, { duration: 700 });
//     tagOpacity.value = withSequence(
//       withTiming(0, { duration: 500 }),
//       withTiming(1, { duration: 500 })
//     );

//     const timer = setTimeout(() => {
//       opacity.value = withTiming(0, { duration: 400 }, (finished) => {
//         if (finished && onFinish) runOnJS(onFinish)();
//       });
//     }, 1900);

//     return () => clearTimeout(timer);
//   }, []);

//   const logoStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//     opacity: opacity.value,
//   }));

//   const containerStyle = useAnimatedStyle(() => ({
//     opacity: opacity.value,
//   }));

//   const tagStyle = useAnimatedStyle(() => ({
//     opacity: tagOpacity.value,
//   }));

//   return (
//     <Animated.View style={[styles.container, containerStyle]}>
//       <LinearGradient colors={[palette.primary, palette.secondary]} style={StyleSheet.absoluteFill} />
//       <Animated.View style={[styles.logoCircle, logoStyle]}>
//         <Text style={styles.logoEmoji}>🍳</Text>
//       </Animated.View>
//       <Animated.Text style={[styles.title, logoStyle]}>PantryChef AI</Animated.Text>
//       <Animated.Text style={[styles.tagline, tagStyle]}>
//         Cook smarter with what you already have
//       </Animated.Text>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     gap: spacing.md,
//   },
//   logoCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "rgba(255,255,255,0.25)",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: spacing.sm,
//   },
//   logoEmoji: {
//     fontSize: 48,
//   },
//   title: {
//     fontSize: fontSizes.xxl,
//     fontWeight: fontWeights.extrabold,
//     color: "#FFFFFF",
//     letterSpacing: 0.5,
//   },
//   tagline: {
//     fontSize: fontSizes.sm,
//     color: "rgba(255,255,255,0.9)",
//     fontWeight: fontWeights.medium,
//   },
// });
