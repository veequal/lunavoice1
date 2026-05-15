/** @typedef {'google' | 'apple'} AuthProvider */
/** @typedef {'parent' | 'doctor' | 'child'} AuthRole */

/**
 * @typedef {object} MockAuthAccount
 * @property {string} id
 * @property {AuthProvider} provider
 * @property {string} name
 * @property {string} email
 * @property {string} avatar — initials for mock avatar chip
 * @property {string} avatarColor — tailwind gradient classes
 * @property {AuthRole} role
 * @property {boolean} [recent]
 */

/** @type {MockAuthAccount[]} */
export const mockGoogleAccounts = [
  {
    id: 'google-emily',
    provider: 'google',
    name: 'Emily Patel',
    email: 'emily.parent@gmail.com',
    avatar: 'EP',
    avatarColor: 'from-teal-400 to-cyan-500',
    role: 'parent',
    recent: true,
  },
  {
    id: 'google-johnson',
    provider: 'google',
    name: 'Dr. Sarah Johnson',
    email: 'dr.johnson@lunavoice.com',
    avatar: 'SJ',
    avatarColor: 'from-indigo-400 to-violet-500',
    role: 'doctor',
    recent: true,
  },
  {
    id: 'google-sophia',
    provider: 'google',
    name: 'Sophia Williams',
    email: 'sophia.child@gmail.com',
    avatar: 'SW',
    avatarColor: 'from-amber-400 to-orange-400',
    role: 'child',
  },
]

/** @type {MockAuthAccount[]} */
export const mockAppleAccounts = [
  {
    id: 'apple-emily',
    provider: 'apple',
    name: 'Emily Patel',
    email: 'emily.parent@icloud.com',
    avatar: 'EP',
    avatarColor: 'from-teal-500 to-emerald-600',
    role: 'parent',
    recent: true,
  },
  {
    id: 'apple-johnson',
    provider: 'apple',
    name: 'Dr. Sarah Johnson',
    email: 'dr.johnson@lunavoice.health',
    avatar: 'SJ',
    avatarColor: 'from-slate-500 to-slate-700',
    role: 'doctor',
  },
  {
    id: 'apple-sophia',
    provider: 'apple',
    name: 'Sophia Williams',
    email: 'sophia.family@icloud.com',
    avatar: 'SW',
    avatarColor: 'from-rose-400 to-pink-500',
    role: 'child',
    recent: true,
  },
]

/** @param {AuthRole} portalRole */
export function getGoogleAccountsForPortal(portalRole) {
  const match = mockGoogleAccounts.filter((a) => a.role === portalRole)
  const rest = mockGoogleAccounts.filter((a) => a.role !== portalRole)
  return [...match, ...rest]
}

/** @param {AuthRole} portalRole */
export function getAppleAccountsForPortal(portalRole) {
  const match = mockAppleAccounts.filter((a) => a.role === portalRole)
  const rest = mockAppleAccounts.filter((a) => a.role !== portalRole)
  return [...match, ...rest]
}

/** @param {AuthRole} role */
export function dashboardPathForRole(role) {
  if (role === 'parent') return '/parent-dashboard'
  if (role === 'doctor') return '/doctor-dashboard'
  return '/child-dashboard'
}
