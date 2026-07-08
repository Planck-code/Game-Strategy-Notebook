'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const tagColors = {
  blue: 'bg-primary/15 text-primary ring-primary/25',
  teal: 'bg-[oklch(0.72_0.13_165_/_0.15)] text-[oklch(0.78_0.13_165)] ring-[oklch(0.72_0.13_165_/_0.25)]',
  amber: 'bg-[oklch(0.75_0.14_85_/_0.15)] text-[oklch(0.8_0.14_85)] ring-[oklch(0.75_0.14_85_/_0.25)]',
  purple: 'bg-[oklch(0.68_0.17_300_/_0.15)] text-[oklch(0.76_0.15_300)] ring-[oklch(0.68_0.17_300_/_0.25)]',
  neutral: 'bg-muted text-muted-foreground ring-border',
} as const

export type TagColor = keyof typeof tagColors

export function Tag({
  children,
  color = 'blue',
  onRemove,
  className,
}: {
  children: React.ReactNode
  color?: TagColor
  onRemove?: () => void
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] font-medium ring-1 ring-inset',
        tagColors[color],
        className,
      )}
    >
      <span className="opacity-70">#</span>
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 rounded-sm opacity-60 transition-opacity hover:opacity-100"
          aria-label="移除标签"
        >
          <X className="size-3" />
        </button>
      ) : null}
    </span>
  )
}
