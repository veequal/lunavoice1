import clsx from 'clsx'

/** tiny clsx replacement without dependency - actually I used clsx but didn't add to package.json. Remove clsx - use template strings */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}
