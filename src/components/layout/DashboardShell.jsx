import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { DashboardPlanStrip } from '../pricing/DashboardPlanStrip.jsx'
import { DashboardSidebar } from './DashboardSidebar.jsx'
import { PageHeader } from './PageHeader.jsx'
import { useIsLargeScreen } from '../../hooks/useIsLargeScreen.js'
import { SIDEBAR_COLLAPSED_PX, SIDEBAR_EXPANDED_PX } from '../../lib/sidebarLayout.js'

export function DashboardShell({
  title,
  subtitle,
  accent = 'indigo',
  navItems,
  children,
  headerSlot,
  tab: tabProp,
  onTabChange,
  showPlanUsage = true,
}) {
  const [internalTab, setInternalTab] = useState('overview')
  const controlled = tabProp !== undefined && typeof onTabChange === 'function'
  const tab = controlled ? tabProp : internalTab
  const setTab = controlled ? onTabChange : setInternalTab
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const isLarge = useIsLargeScreen()

  const ctx = useMemo(() => ({ tab, setTab }), [tab])

  const marginLeft = isLarge ? (collapsed ? SIDEBAR_COLLAPSED_PX : SIDEBAR_EXPANDED_PX) : 0

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 light:bg-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-mesh-gradient" />
      <div className="pointer-events-none fixed -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none fixed -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-3xl" />

      <DashboardSidebar
        active={tab}
        onSelect={setTab}
        accent={accent}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
        items={navItems}
      />

      <motion.div
        className="flex min-h-0 min-h-screen min-w-0 flex-col"
        initial={false}
        animate={{ marginLeft }}
        transition={{ type: 'spring', stiffness: 360, damping: 34 }}
      >
        <PageHeader
          title={title}
          subtitle={subtitle}
          showMenuTrigger={!isLarge}
          onMenuClick={() => setMobileOpen(true)}
          planSlot={showPlanUsage ? <DashboardPlanStrip accent={accent} /> : null}
        />
        {headerSlot}
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-3 py-5 pb-safe sm:px-4 sm:py-6 md:px-6">
          {typeof children === 'function' ? children(ctx) : children}
        </main>
      </motion.div>
    </div>
  )
}
