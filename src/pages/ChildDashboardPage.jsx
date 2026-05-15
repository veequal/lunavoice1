import { useCallback, useEffect, useMemo } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { DashboardShell } from '../components/layout/DashboardShell.jsx'
import { childNavItems } from '../config/dashboardNav.js'
import { ChildPracticeTab } from '../components/child/ChildPracticeTab.jsx'
import { GamesHub } from '../components/child/GamesHub.jsx'
import { RepeatAfterMe } from '../components/child/RepeatAfterMe.jsx'
import {
  childDashboardPath,
  getChildDashboardSuffix,
  getChildDashboardTab,
  isInvalidChildDashboardPath,
} from '../lib/routeKeys.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

function ChildDashboardRoutes() {
  const location = useLocation()
  const reduced = useReducedMotion()
  const suffix = getChildDashboardSuffix(location.pathname)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={suffix || 'overview'}
        initial={reduced ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route index element={<ChildPracticeTab />} />
          <Route path="games/repeat-after-me" element={<RepeatAfterMe />} />
          <Route path="games" element={<GamesHub />} />
          <Route path="*" element={<Navigate to="/child-dashboard" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function ChildDashboardPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeTab = getChildDashboardTab(location.pathname)
  const reduced = useReducedMotion()

  const { title, subtitle } = useMemo(() => {
    const suffix = getChildDashboardSuffix(location.pathname)
    if (suffix === 'games') {
      return {
        title: 'Speech Adventure Games',
        subtitle: 'Practice speaking while having fun with interactive AI-powered speech games.',
      }
    }
    if (suffix === 'games/repeat-after-me') {
      return {
        title: 'Repeat After Me',
        subtitle: 'Listen, repeat, and earn stars with mock LunaVoice pronunciation feedback.',
      }
    }
    return {
      title: 'Practice studio',
      subtitle: 'Pick an exercise, tap the mic, and show off those awesome sounds.',
    }
  }, [location.pathname])

  const handleTabChange = useCallback(
    (id) => {
      navigate(childDashboardPath(id), { replace: true })
    },
    [navigate],
  )

  useEffect(() => {
    document.title = 'LunaVoice · Child dashboard'
  }, [])

  useEffect(() => {
    if (isInvalidChildDashboardPath(location.pathname)) {
      navigate('/child-dashboard', { replace: true })
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    document.querySelector('main')?.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <DashboardShell
      title={title}
      subtitle={subtitle}
      accent="amber"
      navItems={childNavItems}
      tab={activeTab}
      onTabChange={handleTabChange}
    >
      <motion.div
        className="pointer-events-none fixed -left-24 top-32 -z-10 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl"
        animate={reduced ? undefined : { opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none fixed -right-24 bottom-10 -z-10 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"
        animate={reduced ? undefined : { opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
      />
      <ChildDashboardRoutes />
    </DashboardShell>
  )
}
