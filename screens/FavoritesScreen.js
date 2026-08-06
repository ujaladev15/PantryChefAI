// import React, { useState, useMemo } from "react";
// import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useTheme } from "../context/ThemeContext";
// import { useFavorites } from "../context/FavoritesContext";
// import { spacing, fontSizes, fontWeights, radius } from "../constants/theme";
// import { getAllRecipes } from "../services/recipeService";
// import SearchBar from "../components/SearchBar";
// import RecipeCard from "../components/RecipeCard";
// import EmptyState from "../components/EmptyState";

// export default function FavoritesScreen({ navigation }) {
//   const { theme } = useTheme();
//   const { favoriteIds, loaded } = useFavorites();
//   const [query, setQuery] = useState("");
//   const [viewMode, setViewMode] = useState("list"); // "list" | "grid"

//   const allRecipes = getAllRecipes();
//   const favoriteRecipes = useMemo(
//     () => allRecipes.filter((r) => favoriteIds.includes(r.id) && r.title.toLowerCase().includes(query.toLowerCase())),
//     [favoriteIds, query]
//   );

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={["top"]}>
//       <View style={styles.header}>
//         <Text style={[styles.headerTitle, { color: theme.text }]}>Favorites</Text>
//         <Pressable onPress={() => setViewMode((m) => (m === "list" ? "grid" : "list"))} hitSlop={10}>
//           <Ionicons name={viewMode === "list" ? "grid-outline" : "list-outline"} size={22} color={theme.text} />
//         </Pressable>
//       </View>

//       {favoriteIds.length > 0 && (
//         <View style={styles.searchWrap}>
//           <SearchBar value={query} onChangeText={setQuery} placeholder="Search favorites…" />
//         </View>
//       )}

//       {!loaded ? null : favoriteRecipes.length === 0 ? (
//         <EmptyState
//           icon="heart-outline"
//           title={favoriteIds.length === 0 ? "No favorites yet" : "No matches"}
//           message={
//             favoriteIds.length === 0
//               ? "Tap the heart icon on any recipe to save it here for quick access later."
//               : "Try a different search term."
//           }
//           actionLabel={favoriteIds.length === 0 ? "Explore Recipes" : undefined}
//           onActionPress={() => navigation.navigate("HomeTab")}
//         />
//       ) : (
//         <FlatList
//           data={favoriteRecipes}
//           key={viewMode}
//           numColumns={viewMode === "grid" ? 2 : 1}
//           columnWrapperStyle={viewMode === "grid" ? { gap: spacing.md } : undefined}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ padding: spacing.xl, paddingTop: 0 }}
//           showsVerticalScrollIndicator={false}
//           renderItem={({ item, index }) => (
//             <View style={viewMode === "grid" ? { flex: 1 } : undefined}>
//               <RecipeCard
//                 recipe={item}
//                 index={index}
//                 layout={viewMode === "grid" ? "compact" : "horizontal"}
//                 onPress={() => navigation.navigate("RecipeDetails", { recipeId: item.id })}
//               />
//             </View>
//           )}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: spacing.xl,
//     marginBottom: spacing.lg,
//   },
//   headerTitle: { fontSize: fontSizes.xl, fontWeight: fontWeights.extrabold },
//   searchWrap: { paddingHorizontal: spacing.xl, marginBottom: spacing.lg },
// });
