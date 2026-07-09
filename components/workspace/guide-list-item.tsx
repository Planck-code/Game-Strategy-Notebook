'use client'

import { FileEdit } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type Guide, statusColors } from '@/mock/guides'

export type GuideListItemProps = {
  guide: Guide
  isActive: boolean
  onClick: () => void
}

export function GuideListItem({ guide, isActive, onClick }: GuideListItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-all duration-200',
        isActive
          ? 'bg-sidebar-accent text-foreground shadow-sm ring-1 ring-primary/20'
          : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground',
      )}
    >
      {/* 类型图标 */}
      <div
        className={cn(
          'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md',
          isActive ? 'bg-primary/15 text-primary' : 'bg-muted/50 text-muted-foreground',
        )}
      >
        <FileEdit className="size-3" />
      </div>

      {/* 标题 + 元信息 */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium leading-tight">{guide.title}</p>
        <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <span
            className={cn('inline-block size-1.5 rounded-full', statusColors[guide.status])}
          />
          {guide.gameName}
        </p>
      </div>
    </button>
  )
}
