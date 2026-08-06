// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Pressable,
//   Dimensions,
//   Share,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
// import { useTheme } from "../context/ThemeContext";
// import { useFavorites } from "../context/FavoritesContext";
// import { spacing, fontSizes, fontWeights, radius, shadow } from "../constants/theme";
// import { getRecipeById, getAllRecipes } from "../services/recipeService";
// import { formatCookTime } from "../utils/helpers";
// import NutritionCard from "../components/NutritionCard";
// import RecipeCard from "../components/RecipeCard";
// import Snackbar from "../components/Snackbar";
// import useSnackbar from "../hooks/useSnackbar";

// const { width } = Dimensions.get("window");
// const TABS = ["Ingredients", "Instructions", "Reviews"];

// export default function RecipeDetailsScreen({ route, navigation }) {
//   const { theme } = useTheme();
//   const { recipeId } = route.params;
//   const recipe = getRecipeById(recipeId);
//   const { isFavorite, toggleFavorite } = useFavorites();
//   const { visible, message, showSnackbar, hideSnackbar } = useSnackbar();

//   const [activeTab, setActiveTab] = useState("Ingredients");
//   const [checkedIngredients, setCheckedIngredients] = useState([]);
//   const [liked, setLiked] = useState(false);
//   const [timerSeconds, setTimerSeconds] = useState(0);
//   const [timerRunning, setTimerRunning] = useState(false);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     if (timerRunning) {
//       intervalRef.current = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
//     } else if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//     return () => clearInterval(intervalRef.current);
//   }, [timerRunning]);

//   if (!recipe) {
//     return (
//       <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//         <Text style={{ color: theme.text, padding: spacing.xl }}>Recipe not found.</Text>
//       </SafeAreaView>
//     );
//   }

//   const favorite = isFavorite(recipe.id);
//   const similar = getAllRecipes().filter((r) => r.id !== recipe.id).slice(0, 4);

//   const toggleIngredientCheck = (id) => {
//     setCheckedIngredients((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const formatTimer = (secs) => {
//     const m = Math.floor(secs / 60).toString().padStart(2, "0");
//     const s = (secs % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({ message: `Check out this recipe: ${recipe.title} on PantryChef AI!` });
//     } catch (e) {
//       // ignore
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={["bottom"]}>
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
//         <View style={styles.heroWrap}>
//           <Image source={{ uri: recipe.image }} style={styles.heroImage} />
//           <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} style={styles.heroOverlay} />
//           <SafeAreaView style={styles.heroTopBar} edges={["top"]}>
//             <Pressable onPress={() => navigation.goBack()} style={styles.circleBtn}>
//               <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
//             </Pressable>
//             <View style={{ flexDirection: "row", gap: spacing.sm }}>
//               <Pressable onPress={handleShare} style={styles.circleBtn}>
//                 <Ionicons name="share-outline" size={20} color="#FFFFFF" />
//               </Pressable>
//               <Pressable onPress={() => toggleFavorite(recipe.id)} style={styles.circleBtn}>
//                 <Ionicons name={favorite ? "bookmark" : "bookmark-outline"} size={20} color="#FFFFFF" />
//               </Pressable>
//             </View>
//           </SafeAreaView>
//         </View>

//         <Animated.View entering={FadeInDown.duration(400)} style={[styles.sheet, { backgroundColor: theme.background }]}>
//           <Text style={[styles.title, { color: theme.text }]}>{recipe.title}</Text>
//           <Text style={[styles.description, { color: theme.textSecondary }]}>{recipe.description}</Text>

//           <View style={styles.metaRow}>
//             <View style={styles.metaItem}>
//               <Ionicons name="time-outline" size={16} color={theme.primary} />
//               <Text style={[styles.metaText, { color: theme.text }]}>{formatCookTime(recipe.cookTime)}</Text>
//             </View>
//             <View style={styles.metaItem}>
//               <Ionicons name="flame-outline" size={16} color={theme.primary} />
//               <Text style={[styles.metaText, { color: theme.text }]}>{recipe.difficulty}</Text>
//             </View>
//             <View style={styles.metaItem}>
//               <Ionicons name="star" size={16} color={theme.star} />
//               <Text style={[styles.metaText, { color: theme.text }]}>
//                 {recipe.rating} ({recipe.reviewCount})
//               </Text>
//             </View>
//             <View style={styles.metaItem}>
//               <Ionicons name="people-outline" size={16} color={theme.primary} />
//               <Text style={[styles.metaText, { color: theme.text }]}>{recipe.servings} servings</Text>
//             </View>
//           </View>

//           <View style={styles.actionsRow}>
//             <Pressable
//               onPress={() => setLiked((v) => !v)}
//               style={[styles.likeBtn, { backgroundColor: liked ? theme.primary + "22" : theme.cardAlt }]}
//             >
//               <Ionicons name={liked ? "heart" : "heart-outline"} size={18} color={theme.primary} />
//               <Text style={{ color: theme.primary, fontWeight: fontWeights.semibold, fontSize: fontSizes.sm }}>
//                 {liked ? "Liked" : "Like"}
//               </Text>
//             </Pressable>

//             <View style={[styles.timerBox, { backgroundColor: theme.cardAlt }]}>
//               <Ionicons name="timer-outline" size={18} color={theme.text} />
//               <Text style={[styles.timerText, { color: theme.text }]}>{formatTimer(timerSeconds)}</Text>
//               <Pressable onPress={() => setTimerRunning((v) => !v)} hitSlop={8}>
//                 <Ionicons name={timerRunning ? "pause-circle" : "play-circle"} size={26} color={theme.primary} />
//               </Pressable>
//             </View>
//           </View>

//           <Text style={[styles.sectionLabel, { color: theme.text }]}>Nutrition</Text>
//           <NutritionCard nutrition={recipe.nutrition} />

//           <View style={[styles.tabsRow, { borderBottomColor: theme.border }]}>
//             {TABS.map((tab) => (
//               <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tabBtn}>
//                 <Text
//                   style={[
//                     styles.tabText,
//                     { color: activeTab === tab ? theme.primary : theme.textSecondary },
//                   ]}
//                 >
//                   {tab}
//                 </Text>
//                 {activeTab === tab && <View style={[styles.tabIndicator, { backgroundColor: theme.primary }]} />}
//               </Pressable>
//             ))}
//           </View>

//           {activeTab === "Ingredients" && (
//             <View style={styles.tabContent}>
//               {recipe.ingredients.map((ing) => {
//                 const checked = checkedIngredients.includes(ing.id);
//                 return (
//                   <Pressable
//                     key={ing.id}
//                     style={styles.ingredientRow}
//                     onPress={() => toggleIngredientCheck(ing.id)}
//                   >
//                     <Ionicons
//                       name={checked ? "checkbox" : "square-outline"}
//                       size={22}
//                       color={checked ? theme.accent : theme.textSecondary}
//                     />
//                     <Text style={styles.ingredientEmoji}>{ing.emoji}</Text>
//                     <Text
//                       style={[
//                         styles.ingredientName,
//                         { color: theme.text, textDecorationLine: checked ? "line-through" : "none" },
//                       ]}
//                     >
//                       {ing.name}
//                     </Text>
//                     <Text style={[styles.ingredientAmount, { color: theme.textSecondary }]}>{ing.amount}</Text>
//                   </Pressable>
//                 );
//               })}
//             </View>
//           )}

//           {activeTab === "Instructions" && (
//             <View style={styles.tabContent}>
//               {recipe.steps.map((step) => (
//                 <View key={step.order} style={styles.stepRow}>
//                   <View style={[styles.stepNumber, { backgroundColor: theme.primary }]}>
//                     <Text style={styles.stepNumberText}>{step.order}</Text>
//                   </View>
//                   <Text style={[styles.stepText, { color: theme.text }]}>{step.text}</Text>
//                 </View>
//               ))}
//             </View>
//           )}

//           {activeTab === "Reviews" && (
//             <View style={styles.tabContent}>
//               {recipe.reviews.map((review, i) => (
//                 <View key={i} style={[styles.reviewCard, { backgroundColor: theme.cardAlt }]}>
//                   <View style={styles.reviewHeader}>
//                     <Text style={[styles.reviewUser, { color: theme.text }]}>{review.user}</Text>
//                     <View style={styles.reviewStars}>
//                       {Array.from({ length: 5 }).map((_, idx) => (
//                         <Ionicons
//                           key={idx}
//                           name={idx < review.rating ? "star" : "star-outline"}
//                           size={13}
//                           color={theme.star}
//                         />
//                       ))}
//                     </View>
//                   </View>
//                   <Text style={[styles.reviewComment, { color: theme.textSecondary }]}>{review.comment}</Text>
//                 </View>
//               ))}
//             </View>
//           )}

//           <View style={styles.similarSection}>
//             <Text style={[styles.sectionLabel, { color: theme.text }]}>Similar Recipes</Text>
//             {similar.map((r, index) => (
//               <RecipeCard
//                 key={r.id}
//                 recipe={r}
//                 index={index}
//                 onPress={() => navigation.push("RecipeDetails", { recipeId: r.id })}
//               />
//             ))}
//           </View>
//         </Animated.View>
//       </ScrollView>

//       <View style={[styles.bottomBar, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
//         <Pressable
//           style={[styles.addBtn, { backgroundColor: theme.primary }]}
//           onPress={() => showSnackbar("Added to your cooking list!")}
//         >
//           <Ionicons name="restaurant-outline" size={18} color="#FFFFFF" />
//           <Text style={styles.addBtnText}>Start Cooking</Text>
//         </Pressable>
//       </View>

//       <Snackbar visible={visible} message={message} onHide={hideSnackbar} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   heroWrap: { width, height: 320 },
//   heroImage: { width: "100%", height: "100%" },
//   heroOverlay: { position: "absolute", top: 0, left: 0, right: 0, height: 120 },
//   heroTopBar: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: spacing.lg,
//     paddingTop: spacing.sm,
//   },
//   circleBtn: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: "rgba(0,0,0,0.35)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   sheet: {
//     marginTop: -24,
//     borderTopLeftRadius: radius.xl,
//     borderTopRightRadius: radius.xl,
//     padding: spacing.xl,
//   },
//   title: { fontSize: fontSizes.xxl, fontWeight: fontWeights.extrabold, marginBottom: spacing.xs },
//   description: { fontSize: fontSizes.sm, lineHeight: 20, marginBottom: spacing.lg },
//   metaRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg, marginBottom: spacing.lg },
//   metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
//   metaText: { fontSize: fontSizes.xs, fontWeight: fontWeights.semibold },
//   actionsRow: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.xl },
//   likeBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: spacing.lg,
//     paddingVertical: spacing.sm + 2,
//     borderRadius: radius.pill,
//   },
//   timerBox: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: spacing.lg,
//     paddingVertical: spacing.sm + 2,
//     borderRadius: radius.pill,
//   },
//   timerText: { fontSize: fontSizes.md, fontWeight: fontWeights.bold, fontVariant: ["tabular-nums"] },
//   sectionLabel: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, marginBottom: spacing.md, marginTop: spacing.md },
//   tabsRow: { flexDirection: "row", borderBottomWidth: 1, marginTop: spacing.xl, marginBottom: spacing.lg },
//   tabBtn: { marginRight: spacing.xl, paddingBottom: spacing.sm },
//   tabText: { fontSize: fontSizes.sm, fontWeight: fontWeights.semibold },
//   tabIndicator: { height: 2, marginTop: spacing.sm, borderRadius: 2 },
//   tabContent: { gap: spacing.md, marginBottom: spacing.lg },
//   ingredientRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingVertical: 6 },
//   ingredientEmoji: { fontSize: 18 },
//   ingredientName: { flex: 1, fontSize: fontSizes.sm, fontWeight: fontWeights.medium },
//   ingredientAmount: { fontSize: fontSizes.xs },
//   stepRow: { flexDirection: "row", gap: spacing.md, alignItems: "flex-start" },
//   stepNumber: {
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   stepNumberText: { color: "#FFFFFF", fontSize: fontSizes.xs, fontWeight: fontWeights.bold },
//   stepText: { flex: 1, fontSize: fontSizes.sm, lineHeight: 20 },
//   reviewCard: { padding: spacing.md, borderRadius: radius.md, gap: 6 },
//   reviewHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   reviewUser: { fontSize: fontSizes.sm, fontWeight: fontWeights.semibold },
//   reviewStars: { flexDirection: "row", gap: 2 },
//   reviewComment: { fontSize: fontSizes.xs, lineHeight: 18 },
//   similarSection: { marginTop: spacing.lg },
//   bottomBar: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: spacing.lg,
//     borderTopWidth: 1,
//   },
//   addBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: spacing.sm,
//     paddingVertical: spacing.md,
//     borderRadius: radius.pill,
//   },
//   addBtnText: { color: "#FFFFFF", fontSize: fontSizes.md, fontWeight: fontWeights.bold },
// });
