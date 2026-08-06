// import React, { useState, useMemo } from "react";
// import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import Animated, { FadeInUp } from "react-native-reanimated";
// import { useTheme } from "../context/ThemeContext";
// import { spacing, fontSizes, fontWeights, radius, shadow } from "../constants/theme";
// import { getAllIngredients } from "../services/recipeService";
// import { groupBy } from "../utils/helpers";
// import SearchBar from "../components/SearchBar";
// import IngredientChip from "../components/IngredientChip";
// import CustomButton from "../components/CustomButton";

// const ALL_INGREDIENTS = getAllIngredients();
// const CATEGORIES = ["All", ...Array.from(new Set(ALL_INGREDIENTS.map((i) => i.category)))];

// export default function IngredientSelectionScreen({ navigation }) {
//   const { theme } = useTheme();
//   const [query, setQuery] = useState("");
//   const [category, setCategory] = useState("All");
//   const [selected, setSelected] = useState([]);

//   const filtered = useMemo(() => {
//     return ALL_INGREDIENTS.filter((i) => {
//       const matchesQuery = i.name.toLowerCase().includes(query.toLowerCase());
//       const matchesCategory = category === "All" || i.category === category;
//       return matchesQuery && matchesCategory;
//     });
//   }, [query, category]);

//   const grouped = useMemo(() => groupBy(filtered, (i) => i.category), [filtered]);

//   const toggleIngredient = (id) => {
//     setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={["top"]}>
//       <View style={styles.header}>
//         <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
//           <Ionicons name="chevron-back" size={24} color={theme.text} />
//         </Pressable>
//         <Text style={[styles.headerTitle, { color: theme.text }]}>Select Ingredients</Text>
//         <View style={[styles.counterBadge, { backgroundColor: theme.primary }]}>
//           <Text style={styles.counterText}>{selected.length}</Text>
//         </View>
//       </View>

//       <View style={styles.searchWrap}>
//         <SearchBar value={query} onChangeText={setQuery} placeholder="Search ingredients…" />
//       </View>

//       <FlatList
//         data={CATEGORIES}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item}
//         contentContainerStyle={styles.categoryRow}
//         renderItem={({ item }) => (
//           <Pressable
//             onPress={() => setCategory(item)}
//             style={[
//               styles.categoryPill,
//               {
//                 backgroundColor: category === item ? theme.primary : theme.cardAlt,
//                 borderColor: category === item ? theme.primary : theme.border,
//               },
//             ]}
//           >
//             <Text style={{ color: category === item ? "#FFFFFF" : theme.text, fontWeight: fontWeights.medium, fontSize: fontSizes.xs }}>
//               {item}
//             </Text>
//           </Pressable>
//         )}
//       />

//       <FlatList
//         data={Object.keys(grouped)}
//         keyExtractor={(key) => key}
//         contentContainerStyle={{ paddingHorizontal: spacing.xl, paddingBottom: 140 }}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item: groupKey, index: groupIndex }) => (
//           <Animated.View entering={FadeInUp.delay(groupIndex * 40).duration(300)} style={styles.group}>
//             <Text style={[styles.groupTitle, { color: theme.textSecondary }]}>{groupKey}</Text>
//             <View style={styles.grid}>
//               {grouped[groupKey].map((ingredient) => (
//                 <IngredientChip
//                   key={ingredient.id}
//                   ingredient={ingredient}
//                   selected={selected.includes(ingredient.id)}
//                   onToggle={() => toggleIngredient(ingredient.id)}
//                 />
//               ))}
//             </View>
//           </Animated.View>
//         )}
//       />

//       <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
//         <CustomButton
//           title={selected.length > 0 ? `Find Recipes (${selected.length} selected)` : "Select ingredients to continue"}
//           disabled={selected.length === 0}
//           onPress={() => navigation.navigate("AIRecommendation", { selectedIngredientIds: selected })}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: spacing.xl,
//     paddingBottom: spacing.md,
//   },
//   headerTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold },
//   counterBadge: {
//     minWidth: 26,
//     height: 26,
//     borderRadius: 13,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 6,
//   },
//   counterText: { color: "#FFFFFF", fontSize: fontSizes.xs, fontWeight: fontWeights.bold },
//   searchWrap: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
//   categoryRow: { paddingHorizontal: spacing.xl, gap: spacing.sm, paddingBottom: spacing.lg },
//   categoryPill: {
//     paddingVertical: spacing.sm,
//     paddingHorizontal: spacing.md,
//     borderRadius: radius.pill,
//     borderWidth: 1,
//     marginRight: spacing.sm,
//   },
//   group: { marginBottom: spacing.xl },
//   groupTitle: {
//     fontSize: fontSizes.xs,
//     fontWeight: fontWeights.bold,
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//     marginBottom: spacing.sm,
//   },
//   grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: spacing.xl,
//     borderTopWidth: 1,
//   },
// });
