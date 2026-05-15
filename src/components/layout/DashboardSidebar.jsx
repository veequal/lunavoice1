import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, LogOut, X } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton.jsx'
import { LunaVoiceLogo } from '../brand/LunaVoiceLogo.jsx'
import { cn } from '../../lib/cn.js'
import { doctorNavItems } from '../../config/dashboardNav.js'
import { SIDEBAR_COLLAPSED_PX, SIDEBAR_EXPANDED_PX } from '../../lib/sidebarLayout.js'

/** @param {{ collapsedUi: boolean }} opts */
function SidebarNav({
  active,
  onSelect,
  accent = 'indigo',
  collapsedUi,
  onMobileOpenChange,
  items = doctorNavItems,
  onToggleCollapsed,
  showCollapseControl,
}) {
  const accentRing =
    accent === 'teal'
      ? 'data-[active=true]:bg-teal-500/15 data-[active=true]:text-teal-200 data-[active=true]:ring-teal-400/25'
      : accent === 'amber'
        ? 'data-[active=true]:bg-amber-500/15 data-[active=true]:text-amber-100 data-[active=true]:ring-amber-400/25'
        : 'data-[active=true]:bg-indigo-500/15 data-[active=true]:text-indigo-100 data-[active=true]:ring-indigo-400/25'

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Dashboard">
      <div className={cn('mb-4 px-1', collapsedUi && 'flex justify-center')}>
        {collapsedUi ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-indigo-500/35 to-violet-500/25 text-xs font-bold text-white shadow-glow-sm light:border-slate-200 light:from-indigo-200 light:to-violet-100 light:text-indigo-900">
            LV
          </div>
        ) : (
          <LunaVoiceLogo size="sm" />
        )}
      </div>
      {items.map((item) => {
        const Icon = item.icon
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            type="button"
            data-active={isActive}
            onClick={() => {
              onSelect(item.id)
              onMobileOpenChange?.(false)
            }}
            className={cn(
              'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-300 ring-1 ring-transparent transition-all duration-200 hover:bg-white/5 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] light:text-slate-700 light:hover:bg-slate-900/5 light:hover:text-slate-900',
              accent === 'amber' && 'hover:shadow-[0_0_22px_rgba(251,191,36,0.12)]',
              collapsedUi && 'justify-center px-2',
              accentRing,
            )}
            title={collapsedUi ? item.label : undefined}
          >
            <Icon
              className={cn(
                'h-4 w-4 shrink-0 opacity-90 transition-all group-hover:opacity-100',
                accent === 'amber' && 'group-hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.55)]',
                isActive && accent === 'amber' && 'drop-shadow-[0_0_8px_rgba(251,191,36,0.65)]',
              )}
            />
            <motion.span
              className="min-w-0 font-medium"
              initial={false}
              animate={{
                opacity: collapsedUi ? 0 : 1,
                x: collapsedUi ? -8 : 0,
              }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                pointerEvents: collapsedUi ? 'none' : 'auto',
                width: collapsedUi ? 0 : 'auto',
                overflow: 'hidden',
              }}
            >
              {item.label}
            </motion.span>
          </button>
        )
      })}

      <div className="mt-auto space-y-2 border-t border-white/10 pt-4 light:border-slate-200">
        {showCollapseControl ? (
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:bg-white/10 light:border-slate-200 light:bg-slate-50 light:text-slate-800 light:hover:bg-slate-100"
          >
            {collapsedUi ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <motion.span
              initial={false}
              animate={{ opacity: collapsedUi ? 0 : 1, width: collapsedUi ? 0 : 'auto' }}
              className="overflow-hidden whitespace-nowrap"
            >
              Collapse
            </motion.span>
          </button>
        ) : null}

        <Link to="/" onClick={() => onMobileOpenChange?.(false)}>
          <GlowButton variant="secondary" className={cn('w-full', collapsedUi && '!px-2')}>
            {collapsedUi ? (
              <span className="flex items-center justify-center gap-2">
                <LogOut className="h-4 w-4" />
              </span>
            ) : (
              <span className="truncate">Switch portal</span>
            )}
          </GlowButton>
        </Link>
      </div>
    </nav>
  )
}

/** @param {{ active: string, onSelect: (id: string) => void, accent?: 'indigo' | 'teal' | 'amber', collapsed?: boolean, onToggleCollapsed?: () => void, mobileOpen?: boolean, onMobileOpenChange?: (open: boolean) => void, items?: typeof doctorNavItems }} props */
export function DashboardSidebar({
  active,
  onSelect,
  accent = 'indigo',
  collapsed = false,
  onToggleCollapsed,
  mobileOpen,
  onMobileOpenChange,
  items = doctorNavItems,
}) {
  const width = collapsed ? SIDEBAR_COLLAPSED_PX : SIDEBAR_EXPANDED_PX

  return (
    <>
      <motion.aside
        className="fixed left-0 top-0 z-40 hidden h-[100dvh] flex-col border-r border-white/10 bg-slate-950/55 shadow-glass backdrop-blur-2xl light:border-slate-200 light:bg-white/80 lg:flex"
        initial={false}
        animate={{ width }}
        transition={{ type: 'spring', stiffness: 360, damping: 34 }}
      >
        <SidebarNav
          active={active}
          onSelect={onSelect}
          accent={accent}
          collapsedUi={collapsed}
          onMobileOpenChange={onMobileOpenChange}
          items={items}
          onToggleCollapsed={onToggleCollapsed}
          showCollapseControl
        />
      </motion.aside>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            key="mobile-drawer"
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/70 light:bg-slate-900/40"
              aria-label="Close navigation"
              onClick={() => onMobileOpenChange?.(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="absolute left-0 top-0 h-full w-[86%] max-w-sm border-r border-white/10 bg-slate-950/95 shadow-glass backdrop-blur-2xl light:border-slate-200 light:bg-white/95"
            >
              <div className="flex items-center justify-end p-2">
                <GlowButton
                  type="button"
                  variant="ghost"
                  className="!px-3 !py-2"
                  onClick={() => onMobileOpenChange?.(false)}
                >
                  <X className="h-4 w-4" />
                </GlowButton>
              </div>
              <SidebarNav
                active={active}
                onSelect={onSelect}
                accent={accent}
                collapsedUi={false}
                onMobileOpenChange={onMobileOpenChange}
                items={items}
                onToggleCollapsed={onToggleCollapsed}
                showCollapseControl={false}
              />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
