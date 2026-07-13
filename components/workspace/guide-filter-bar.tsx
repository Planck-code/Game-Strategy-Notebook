'use client'

import { ArrowUpDown } from 'lucide-react'
import { useWorkspace } from './workspace-provider'
import { games } from '@/mock'
import { cn } from '@/lib/utils'

export function GuideFilterBar() {
  const { gameFilter, setGameFilter, tagFilter, setTagFilter, sortOrder, setSortOrder } =
    useWorkspace()

  const sortOptions = [
    { value: 'updated_desc' as const, label: '最近更新' },
    { value: 'updated_asc' as const, label: '最早更新' },
    { value: 'title' as const, label: '按标题' },
  ]

  return (
    <div className="space-y-2 px-3 py-2">
      {/* 游戏筛选下拉 */}
      <div className="flex items-center gap-1.5">
        <select
          value={gameFilter ?? ''}
          onChange={(e) => setGameFilter(e.target.value || null)}
          className="h-7 w-full rounded-lg border border-border/50 bg-background/60 pl-2 pr-1 font-mono text-[11px] text-muted-foreground outline-none focus-visible:border-ring"
        >
          <option value="">全部游戏</option>
          {games.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* 排序切换 */}
      <div className="flex items-center gap-1">
        <ArrowUpDown className="size-3 text-muted-foreground/50" />
        <div className="flex flex-1 gap-0.5">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortOrder(opt.value)}
              className={cn(
                'flex-1 rounded-md px-1.5 py-1 font-mono text-[10px] transition-colors',
                sortOrder === opt.value
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 活跃的标签筛选 chip */}
      {tagFilter ? (
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
            #{tagFilter}
            <button
              onClick={() => setTagFilter(null)}
              className="ml-0.5 text-primary/60 hover:text-primary"
              aria-label={`清除标签筛选 ${tagFilter}`}
            >
              ×
            </button>
          </span>
        </div>
      ) : null}
    </div>
  )
}
