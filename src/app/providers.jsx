import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'lunavoice-theme'
/** Previous installs may have used this key; read once for theme migration */
const LEGACY_THEME_STORAGE_KEY = 'voxera-theme'

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem(LEGACY_THEME_STORAGE_KEY) || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
