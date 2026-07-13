import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { timelineTypeLabels } from '@/lib/labels'
import type { TimelineEvent } from '@/mock'

// ============================================================
// TimelineEventCard — 时间线事件节点
//
// 左侧：日期 + 色点 + 纵向连接线
// 右侧：事件卡片（标题、游戏、类型 Badge、描述）
// 点击跳转到 /timeline/[id]
// ============================================================

export type TimelineEventCardData = {
  event: TimelineEvent
  gameName?: string
  isLast: boolean
}

export function TimelineEventCard({ data }: { data: TimelineEventCardData }) {
  const { event, gameName, isLast } = data
  const dotColor = event.color ?? 'oklch(0.62 0.18 255)'

  return (
    <div className="flex gap-4">
      {/* 左侧：时间轴 */}
      <div className="flex w-24 shrink-0 flex-col items-end pt-1">
        <span className="font-mono text-xs font-medium text-foreground/80">
          {formatDate(event.date)}
        </span>
      </div>

      {/* 中间：圆点 + 连接线 */}
      <div className="relative flex shrink-0 flex-col items-center">
        <div
          className="relative z-10 mt-1 size-3 shrink-0 rounded-full ring-2 ring-background"
          style={{ backgroundColor: dotColor }}
        />
        {!isLast && (
          <div className="absolute top-4 h-full w-px bg-border/60" />
        )}
      </div>

      {/* 右侧：事件卡片 */}
      <Link href={`/timeline/${event.id}`} className="min-w-0 flex-1 pb-6">
        <div className="group relative rounded-xl border border-border/60 bg-card/50 p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5">
          <ArrowUpRight className="absolute right-3 top-3 size-3.5 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100" />

          {/* 标题 */}
          <h3 className="pr-6 text-sm font-semibold">{event.title}</h3>

          {/* 游戏 + 类型 */}
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {gameName && (
              <span className="font-mono text-[11px] text-primary/60">{gameName}</span>
            )}
            <Badge variant="secondary" className="text-[10px]">
              {timelineTypeLabel(event.type)}
            </Badge>
          </div>

          {/* 描述 */}
          {event.description && (
            <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}

function formatDate(dateStr: string): string {
  return dateStr.slice(5) // "2026-07-09" → "07-09"
}

function timelineTypeLabel(t: string): string {
  return timelineTypeLabels[t] ?? t
}
