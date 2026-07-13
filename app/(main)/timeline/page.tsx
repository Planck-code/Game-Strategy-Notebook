'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown, Filter, Clock } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { SearchInput } from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import { TimelineEventCard, type TimelineEventCardData } from '@/components/timeline-event-card'
import { timelineEvents, games, getGameById } from '@/mock'

// ============================================================
// 时间线页面
//
// 以垂直时间线展示所有事件。
// 支持搜索、按游戏/类型筛选、按日期排序。
// ============================================================

type SortOrder = 'date-asc' | 'date-desc'

const typeOptions = [
  { value: 'all', label: '全部类型' },
  { value: 'plot', label: '剧情' },
  { value: 'version', label: '版本更新' },
  { value: 'guide_milestone', label: '攻略里程碑' },
  { value: 'personal', label: '个人记录' },
]

export default function TimelinePage() {
  const [search, setSearch] = useState('')
  const [gameFilter, setGameFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('date-desc')

  // 游戏筛选选项（有事件的游戏）
  const gameOptions = useMemo(() => {
    const gameIds = [
      ...new Set(timelineEvents.map((e) => e.gameId).filter(Boolean)),
    ] as string[]
    return gameIds.map((gid) => ({
      value: gid,
      label: games.find((g) => g.id === gid)?.name ?? gid,
    }))
  }, [])

  // 搜索 + 筛选 + 排序
  const filtered = useMemo(() => {
    let result = timelineEvents.map((event) => ({
      event,
      gameName: event.gameId ? getGameById(event.gameId)?.name : undefined,
      isLast: false, // 后面会设置
    }))

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.event.title.toLowerCase().includes(q) ||
          c.event.description?.toLowerCase().includes(q) ||
          c.gameName?.toLowerCase().includes(q),
      )
    }

    if (gameFilter !== 'all') {
      result = result.filter((c) => c.event.gameId === gameFilter)
    }

    if (typeFilter !== 'all') {
      result = result.filter((c) => c.event.type === typeFilter)
    }

    result.sort((a, b) => {
      const cmp = a.event.date.localeCompare(b.event.date)
      return sortOrder === 'date-desc' ? -cmp : cmp
    })

    // 标记最后一个
    if (result.length > 0) {
      result[result.length - 1] = { ...result[result.length - 1], isLast: true }
    }

    return result as TimelineEventCardData[]
  }, [search, gameFilter, typeFilter, sortOrder])

  return (
    <>
      <PageHeader
        title="时间线"
        description="按时间线整理攻略进度、版本更新和剧情发展。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '时间线' }]}
      />

      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-3 pb-4 pt-2">
        <SearchInput
          placeholder="搜索事件…"
          shortcut=""
          className="max-w-xs flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 游戏筛选 */}
        <div className="flex items-center gap-1.5">
          <Filter className="size-3.5 shrink-0 text-muted-foreground" />
          <select
            value={gameFilter}
            onChange={(e) => setGameFilter(e.target.value)}
            className="h-8 rounded-lg border border-border/60 bg-background/50 px-2.5 font-mono text-[11px] text-foreground/80 outline-none transition-colors focus:border-primary/40 focus:ring-1 focus:ring-primary/30"
          >
            <option value="all">全部游戏</option>
            {gameOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* 类型筛选 */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-8 rounded-lg border border-border/60 bg-background/50 px-2.5 font-mono text-[11px] text-foreground/80 outline-none transition-colors focus:border-primary/40 focus:ring-1 focus:ring-primary/30"
        >
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {/* 排序 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setSortOrder((prev) => (prev === 'date-desc' ? 'date-asc' : 'date-desc'))
          }
          className="shrink-0 gap-1.5"
        >
          <ArrowUpDown className="size-3.5" />
          日期{sortOrder === 'date-desc' ? ' ↓' : ' ↑'}
        </Button>
      </div>

      {/* 结果计数 */}
      <p className="pb-3 font-mono text-[11px] text-muted-foreground">
        共 {filtered.length} 个事件
      </p>

      {/* 时间线 */}
      {filtered.length > 0 ? (
        <div className="max-w-2xl">
          {filtered.map((card) => (
            <TimelineEventCard key={card.event.id} data={card} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Clock} title="没有找到匹配的事件" description="尝试调整筛选条件或搜索关键词。" />
      )}
    </>
  )
}
