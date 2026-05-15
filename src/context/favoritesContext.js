import { createContext } from 'react'

/** @typedef {{ favoriteIds: Set<string>, isFavorite: (id: string) => boolean, toggleFavorite: (doctor: object) => void, removeFavorite: (id: string) => void }} FavoritesContextValue */

/** @type {import('react').Context<FavoritesContextValue | null>} */
export const FavoritesContext = createContext(null)
