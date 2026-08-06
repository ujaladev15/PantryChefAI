// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Dimensions,
//   Pressable,
//   SafeAreaView,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import Animated, { FadeIn } from "react-native-reanimated";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { palette } from "../constants/colors";
// import { spacing, fontSizes, fontWeights, radius } from "../constants/theme";
// import CustomButton from "../components/CustomButton";

// const { width } = Dimensions.get("window");

// const SLIDES = [
//   {
//     key: "why",
//     emoji: "🥗",
//     title: "Why PantryChef",
//     description:
//       "Stop wondering what to cook. PantryChef AI turns the ingredients already in your kitchen into delicious meal ideas.",
//   },
//   {
//     key: "how",
//     emoji: "🤖",
//     title: "How it works",
//     description:
//       "Select what's in your fridge and pantry — our AI instantly matches you with recipes you can make right now.",
//   },
//   {
//     key: "start",
//     emoji: "👨‍🍳",
//     title: "Start Cooking",
//     description:
//       "Save favorites, track your cooking streak, and discover new recipes every day. Let's get cooking!",
//   },
// ];

// export default function OnboardingScreen({ onComplete }) {
//   const [index, setIndex] = useState(0);
//   const listRef = useRef(null);

//   const finish = async () => {
//     try {
//       await AsyncStorage.setItem("@pantrychef_onboarded", "true");
//     } catch (e) {
//       // ignore
//     }
//     onComplete();
//   };

//   const handleNext = () => {
//     if (index < SLIDES.length - 1) {
//       listRef.current?.scrollToIndex({ index: index + 1 });
//     } else {
//       finish();
//     }
//   };

//   const onScrollEnd = (e) => {
//     const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
//     setIndex(newIndex);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.skipRow}>
//         <View />
//         <Pressable onPress={finish} hitSlop={10}>
//           <Text style={styles.skipText}>Skip</Text>
//         </Pressable>
//       </View>

//       <FlatList
//         ref={listRef}
//         data={SLIDES}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.key}
//         onMomentumScrollEnd={onScrollEnd}
//         renderItem={({ item }) => (
//           <Animated.View entering={FadeIn.duration(400)} style={styles.slide}>
//             <LinearGradient
//               colors={[palette.secondary + "33", palette.primary + "22"]}
//               style={styles.iconCircle}
//             >
//               <Text style={styles.emoji}>{item.emoji}</Text>
//             </LinearGradient>
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.description}>{item.description}</Text>
//           </Animated.View>
//         )}
//       />

//       <View style={styles.footer}>
//         <View style={styles.dotsRow}>
//           {SLIDES.map((_, i) => (
//             <View
//               key={i}
//               style={[
//                 styles.dot,
//                 { width: i === index ? 22 : 8, opacity: i === index ? 1 : 0.3 },
//               ]}
//             />
//           ))}
//         </View>
//         <CustomButton
//           title={index === SLIDES.length - 1 ? "Start Cooking" : "Next"}
//           onPress={handleNext}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: palette.background,
//   },
//   skipRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: spacing.xl,
//     paddingTop: spacing.sm,
//   },
//   skipText: {
//     color: palette.text,
//     fontSize: fontSizes.sm,
//     fontWeight: fontWeights.semibold,
//   },
//   slide: {
//     width,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: spacing.xxl,
//   },
//   iconCircle: {
//     width: 160,
//     height: 160,
//     borderRadius: radius.xl * 2,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: spacing.xxl,
//   },
//   emoji: {
//     fontSize: 72,
//   },
//   title: {
//     fontSize: fontSizes.xxl,
//     fontWeight: fontWeights.extrabold,
//     color: palette.text,
//     marginBottom: spacing.md,
//     textAlign: "center",
//   },
//   description: {
//     fontSize: fontSizes.md,
//     color: "#6E6E73",
//     textAlign: "center",
//     lineHeight: 22,
//   },
//   footer: {
//     paddingHorizontal: spacing.xl,
//     paddingBottom: spacing.xl,
//     gap: spacing.xl,
//   },
//   dotsRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: spacing.xs,
//   },
//   dot: {
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: palette.primary,
//   },
// });
