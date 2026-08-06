// Small pure helper functions shared across screens.

export function getGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function matchRecipesToIngredients(recipes, selectedIngredientIds) {
  if (!selectedIngredientIds || selectedIngredientIds.length === 0) return [];
  return recipes
    .map((recipe) => {
      const recipeIngredientIds = recipe.ingredients.map((i) => i.id);
      const available = recipeIngredientIds.filter((id) => selectedIngredientIds.includes(id));
      const missing = recipe.ingredients.filter((i) => !selectedIngredientIds.includes(i.id));
      const matchPercent = Math.round((available.length / recipeIngredientIds.length) * 100);
      return { ...recipe, matchPercent, availableCount: available.length, missing };
    })
    .filter((r) => r.matchPercent > 0)
    .sort((a, b) => b.matchPercent - a.matchPercent);
}

export function formatCookTime(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function truncate(text, max = 90) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

export function groupBy(list, keyFn) {
  return list.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
