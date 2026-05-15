import { Moon, Sun } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton.jsx'
import { useTheme } from '../../app/providers.jsx'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <GlowButton type="button" variant="secondary" onClick={toggleTheme} className="!px-3 !py-2" aria-label="Toggle color theme">
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </GlowButton>
  )
}
