'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown, Filter } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { SearchInput } from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import { QuestCard, type QuestCardData } from '@/components/quest-card'
import { quests, games, guideRelations, getGameById } from '@/mock'

// ============================================================
// 任务页面
//
// 以卡片网格展示所有任务。
// 支持搜索、按游戏/类型/状态筛选、按名称排序。
// ============================================================

type SortOrder = 'name-asc' | 'name-desc'

const typeOptions = [
  { value: 'all', label: '全部类型' },
  { value: 'main', label: '主线' },
  { value: 'side', label: '支线' },
  { value: 'faction', label: '阵营' },
  { value: 'daily', label: '日常' },
  { value: 'event', label: '活动' },
  { value: 'hidden', label: '隐藏' },
]

const statusOptions = [
  { value: 'all', label: '全部状态' },
  { value: 'not_started', label: '未开始' },
  { value: 'in_progress', label: '进行中' },
  { value: 'completed', label: '已完成' },
  { value: 'failed', label: '失败' },
  { value: 'blocked', label: '受阻' },
]

export default function QuestsPage() {
  const [search, setSearch] = useState('')
  const [gameFilter, setGameFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc')

  // 计算每个任务的关联攻略数
  const guideCountByQuest = useMemo(() => {
    const map = new Map<string, number>()
    for (const rel of guideRelations) {
      if (rel.targetType !== 'quest') continue
      map.set(rel.targetId, (map.get(rel.targetId) ?? 0) + 1)
    }
    return map
  }, [])

  // 构建卡片数据
  const questCards: QuestCardData[] = useMemo(() => {
    return quests.map((quest) => ({
      quest,
      gameName: getGameById(quest.gameId)?.name,
      relatedGuideCount: guideCountByQuest.get(quest.id) ?? 0,
    }))
  }, [guideCountByQuest])

  // 游戏筛选选项
  const gameOptions = useMemo(() => {
    const gameIds = [...new Set(quests.map((q) => q.gameId))]
    return gameIds.map((gid) => ({
      value: gid,
      label: games.find((g) => g.id === gid)?.name ?? gid,
    }))
  }, [])

  // 搜索 + 筛选 + 排序
  const filtered = useMemo(() => {
    let result = questCards

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.quest.name.toLowerCase().includes(q) ||
          c.quest.description?.toLowerCase().includes(q) ||
          c.gameName?.toLowerCase().includes(q),
      )
    }

    if (gameFilter !== 'all') {
      result = result.filter((c) => c.quest.gameId === gameFilter)
    }

    if (typeFilter !== 'all') {
      result = result.filter((c) => c.quest.type === typeFilter)
    }

    if (statusFilter !== 'all') {
      result = result.filter((c) => c.quest.status === statusFilter)
    }

    result = [...result].sort((a, b) => {
      const cmp = a.quest.name.localeCompare(b.quest.name, 'zh')
      return sortOrder === 'name-asc' ? cmp : -cmp
    })

    return result
  }, [questCards, search, gameFilter, typeFilter, statusFilter, sortOrder])

  return (
    <>
      <PageHeader
        title="任务"
        description="追踪游戏任务进度、记录任务链和分支剧情。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '任务' }]}
      />

      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-3 pb-4 pt-2">
        <SearchInput
          placeholder="搜索任务…"
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

        {/* 状态筛选 */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-8 rounded-lg border border-border/60 bg-background/50 px-2.5 font-mono text-[11px] text-foreground/80 outline-none transition-colors focus:border-primary/40 focus:ring-1 focus:ring-primary/30"
        >
          {statusOptions.map((o) => (
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
            setSortOrder((prev) => (prev === 'name-asc' ? 'name-desc' : 'name-asc'))
          }
          className="shrink-0 gap-1.5"
        >
          <ArrowUpDown className="size-3.5" />
          名称{sortOrder === 'name-asc' ? ' ↑' : ' ↓'}
        </Button>
      </div>

      {/* 结果计数 */}
      <p className="pb-3 font-mono text-[11px] text-muted-foreground">
        共 {filtered.length} 个任务
      </p>

      {/* 任务网格 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((card) => (
            <QuestCard key={card.quest.id} data={card} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/30 px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">没有找到匹配的任务</p>
        </div>
      )}
    </>
  )
}
