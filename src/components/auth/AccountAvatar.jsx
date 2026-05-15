import { cn } from '../../lib/cn.js'

/** @param {{ initials: string, colorClass: string, size?: 'sm' | 'md' }} props */
export function AccountAvatar({ initials, colorClass, size = 'md' }) {
  const sz = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm'
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white shadow-sm',
        colorClass,
        sz,
      )}
    >
      {initials}
    </span>
  )
}
