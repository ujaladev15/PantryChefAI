import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "@pantrychef_favorites";

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setFavoriteIds(JSON.parse(stored));
      } catch (e) {
        // ignore corrupted storage
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persist = useCallback((ids) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids)).catch(() => {});
  }, []);

  const toggleFavorite = useCallback(
    (recipeId) => {
      setFavoriteIds((prev) => {
        const next = prev.includes(recipeId)
          ? prev.filter((id) => id !== recipeId)
          : [...prev, recipeId];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const isFavorite = useCallback((recipeId) => favoriteIds.includes(recipeId), [favoriteIds]);

  const value = useMemo(
    () => ({ favoriteIds, toggleFavorite, isFavorite, loaded }),
    [favoriteIds, toggleFavorite, isFavorite, loaded]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
