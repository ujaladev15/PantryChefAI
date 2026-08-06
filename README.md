# PantryChef AI 🍳

A polished, production-quality React Native + Expo mobile app concept: pick the ingredients
you already have, and get instant AI-style recipe recommendations. Built as a frontend
engineering showcase — no backend required, all data is realistic mock JSON.

## Tech Stack

- React Native + Expo (SDK 51), JavaScript
- React Navigation (native-stack + bottom-tabs)
- React Native Reanimated for animations
- Expo Linear Gradient, Expo Vector Icons
- AsyncStorage for local persistence (auth session, favorites, dark mode, onboarding)

## Getting Started

```bash
npm install
npx expo start
```

Then scan the QR code with Expo Go (iOS/Android) or run in a simulator (`i` / `a` in the CLI).

## Project Structure

```
assets/           App icons and splash images
components/       Reusable UI building blocks (RecipeCard, IngredientChip, etc.)
constants/        Color palette, spacing/typography/shadow tokens
context/          Theme, Auth (mock), and Favorites providers (AsyncStorage-backed)
data/             Mock JSON: 35 ingredients, 20 recipes
hooks/            Small reusable hooks (useSnackbar, useDebounce)
navigation/       Auth stack, bottom tabs, and root navigator
screens/          Splash, Onboarding, Auth, Home, Ingredient Selection,
                  AI Recommendation, Recipe Details, Favorites, Profile
services/         Mock "API" layer (simulated latency, filtering/matching logic)
utils/            Pure helper functions (matching algorithm, formatting)
```

## Feature Highlights

- Animated splash screen and 3-step onboarding with pagination
- Mock authentication (login / signup / guest / remember me) — no backend calls
- Home screen with search, ingredient shortcuts, popular/recommended/recently viewed rails
- Ingredient picker with category filters, search, and multi-select
- AI-style recommendation engine that scores recipes by ingredient match %
- Recipe details with checklist, step-by-step instructions, nutrition breakdown,
  a working cook timer, reviews, and similar recipes
- Favorites with list/grid toggle and search
- Profile with dark mode toggle, cooking streak, achievements, and settings
- Shimmer loading skeletons, pull-to-refresh, snackbars, and micro-interactions throughout
- Full light/dark theme support persisted across sessions

## Notes

- All "AI recommendations" are computed locally via a simple ingredient-matching
  algorithm (`utils/helpers.js` → `matchRecipesToIngredients`) with an artificial
  delay to simulate a real inference call — perfect for demonstrating loading states.
- Recipe photos use placeholder imagery (picsum.photos) since this is a demo build.
