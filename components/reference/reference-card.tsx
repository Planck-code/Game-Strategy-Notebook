'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type ReferencedEntity } from './reference-utils'
import { ReferenceIcon, getReferenceColor } from './reference-icon'
import type { ReferenceType } from '@/mock'

export type ReferenceCardProps = {
  entity: ReferencedEntity
  onClick?: () => void
  onRemove?: () => void
  size?: 'sm' | 'md'
  className?: string
}

export function ReferenceCard({
  entity,
  onClick,
  onRemove,
  size = 'sm',
  className,
}: ReferenceCardProps) {
  const color = getReferenceColor(entity.type)

  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex items-start gap-2 rounded-lg bg-background/50 transition-colors',
        onClick && 'cursor-pointer hover:bg-background/80',
        size === 'sm' ? 'px-2.5 py-1.5' : 'px-3 py-2',
        className,
      )}
    >
      {/* 图标 */}
      <div className={cn('mt-0.5 shrink-0 rounded-md bg-muted/50 p-1', size === 'md' && 'p-1.5')}>
        <ReferenceIcon type={entity.type} className={cn('text-current', size === 'sm' ? 'size-3' : 'size-3.5', color)} />
      </div>

      {/* 信息 */}
      <div className="min-w-0 flex-1" onClick={onClick}>
        <p className={cn('truncate font-medium leading-tight', size === 'sm' ? 'text-[13px]' : 'text-sm')}>
          {entity.name}
        </p>
        <p className={cn('truncate text-muted-foreground', size === 'sm' ? 'text-[10px]' : 'text-[11px]')}>
          {entity.gameName}
          {entity.meta ? ` · ${entity.meta}` : ''}
        </p>
        {size === 'md' && entity.description ? (
          <p className="mt-1 line-clamp-2 text-[12px] text-muted-foreground/70">
            {entity.description}
          </p>
        ) : null}
      </div>

      {/* 移除按钮 */}
      {onRemove ? (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="shrink-0 rounded p-0.5 text-muted-foreground/40 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
          aria-label={`移除${entity.name}`}
        >
          <X className="size-3" />
        </button>
      ) : null}
    </div>
  )
}
