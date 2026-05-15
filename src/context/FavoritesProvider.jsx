import { useCallback, useEffect, useMemo, useState } from 'react'
import { FavoritesContext } from './favoritesContext.js'

const STORAGE_KEY = 'voxera_health_favorite_doctor_ids'

function readStoredIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => new Set(readStoredIds()))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favoriteIds]))
  }, [favoriteIds])

  const isFavorite = useCallback(
    (id) => {
      return favoriteIds.has(id)
    },
    [favoriteIds],
  )

  const toggleFavorite = useCallback((doctor) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(doctor.id)) next.delete(doctor.id)
      else next.add(doctor.id)
      return next
    })
  }, [])

  const removeFavorite = useCallback((id) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite, removeFavorite }),
    [favoriteIds, isFavorite, removeFavorite, toggleFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
