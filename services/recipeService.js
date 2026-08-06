import recipesData from "../data/recipes.json";
import ingredientsData from "../data/ingredients.json";
import { matchRecipesToIngredients } from "../utils/helpers";

// Simulates a network / AI inference delay so loading skeletons
// and shimmer states have something real to demonstrate.
const FAKE_LATENCY_MS = 900;

export function getAllRecipes() {
  return recipesData;
}

export function getAllIngredients() {
  return ingredientsData;
}

export function getRecipeById(id) {
  return recipesData.find((r) => r.id === id) || null;
}

export function fetchPopularRecipes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sorted = [...recipesData].sort((a, b) => b.rating - a.rating).slice(0, 8);
      resolve(sorted);
    }, FAKE_LATENCY_MS);
  });
}

export function fetchRecommendedRecipes(selectedIngredientIds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(matchRecipesToIngredients(recipesData, selectedIngredientIds));
    }, FAKE_LATENCY_MS + 400);
  });
}

export function searchRecipes(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return recipesData.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q))
  );
}
