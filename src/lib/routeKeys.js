/** Child dashboard sidebar tab ids (also used as URL segments). */
export const CHILD_DASHBOARD_TAB_IDS = ['games']

/** Child games sub-routes under /child-dashboard/games */
export const CHILD_GAME_ROUTES = ['repeat-after-me']

/** Parent dashboard sidebar tab ids (also used as URL segments). */
export const PARENT_DASHBOARD_TAB_IDS = [
  'book-appointment',
  'favorite-doctors',
  'patients',
  'sessions',
  'records',
  'notifications',
]

/**
 * Stable key for route-level page transitions. Sub-paths under the same
 * dashboard share one key so tab switches do not remount the page.
 */
export function getRouteAnimationKey(pathname) {
  const path = pathname.replace(/\/$/, '') || '/'

  if (path.startsWith('/parent-dashboard')) return '/parent-dashboard'
  if (path.startsWith('/doctor-dashboard')) return '/doctor-dashboard'
  if (path.startsWith('/child-dashboard')) return '/child-dashboard'
  if (path.startsWith('/login/')) {
    const role = path.split('/')[2]
    return role ? `/login/${role}` : '/login'
  }

  return path || '/'
}

/** @returns {string} URL segment after /parent-dashboard, or '' for home. */
export function getParentDashboardSuffix(pathname) {
  const path = pathname.replace(/\/$/, '')
  if (!path.startsWith('/parent-dashboard')) return ''
  return path.slice('/parent-dashboard'.length).replace(/^\//, '')
}

/** @returns {string} Active parent sidebar tab id. */
export function getParentDashboardTab(pathname) {
  const suffix = getParentDashboardSuffix(pathname)
  if (!suffix) return 'overview'
  if (PARENT_DASHBOARD_TAB_IDS.includes(suffix)) return suffix
  return 'overview'
}

/** @returns {boolean} True when the URL has an unknown parent-dashboard segment. */
export function isInvalidParentDashboardPath(pathname) {
  const suffix = getParentDashboardSuffix(pathname)
  return Boolean(suffix && !PARENT_DASHBOARD_TAB_IDS.includes(suffix))
}

/** @param {string} tabId */
export function parentDashboardPath(tabId) {
  if (tabId === 'overview') return '/parent-dashboard'
  return `/parent-dashboard/${tabId}`
}

/** @returns {string} URL segment after /child-dashboard, or '' for home. */
export function getChildDashboardSuffix(pathname) {
  const path = pathname.replace(/\/$/, '')
  if (!path.startsWith('/child-dashboard')) return ''
  return path.slice('/child-dashboard'.length).replace(/^\//, '')
}

/** @returns {string} Active child sidebar tab id. */
export function getChildDashboardTab(pathname) {
  const suffix = getChildDashboardSuffix(pathname)
  if (!suffix || suffix === 'games' || suffix.startsWith('games/')) return suffix.startsWith('games') ? 'games' : 'overview'
  if (CHILD_DASHBOARD_TAB_IDS.includes(suffix)) return suffix
  return 'overview'
}

/** @returns {boolean} True when the URL has an unknown child-dashboard segment. */
export function isInvalidChildDashboardPath(pathname) {
  const suffix = getChildDashboardSuffix(pathname)
  if (!suffix) return false
  if (suffix === 'games') return false
  if (suffix.startsWith('games/')) {
    const gameSlug = suffix.slice('games/'.length)
    return Boolean(gameSlug && !CHILD_GAME_ROUTES.includes(gameSlug))
  }
  return !CHILD_DASHBOARD_TAB_IDS.includes(suffix)
}

/** @param {string} tabId */
export function childDashboardPath(tabId) {
  if (tabId === 'overview') return '/child-dashboard'
  return `/child-dashboard/${tabId}`
}

/** @param {string} gameSlug */
export function childGamePath(gameSlug) {
  return `/child-dashboard/games/${gameSlug}`
}
