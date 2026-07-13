'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown, Filter, Skull } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { SearchInput } from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import { BossCard, type BossCardData } from '@/components/boss-card'
import {
  bosses,
  games,
  guideRelations,
  locations,
  maps,
  getGameById,
  getMapById,
  getLocationById,
} from '@/mock'

// ============================================================
// Boss 图鉴页面
//
// 以卡片网格展示所有 Boss。
// 支持搜索、按游戏筛选、按难度筛选、按名称排序。
// ============================================================

type SortOrder = 'name-asc' | 'name-desc'

const difficultyOptions = [
  { value: 'all', label: '全部难度' },
  { value: 'easy', label: '简单' },
  { value: 'normal', label: '普通' },
  { value: 'hard', label: '困难' },
  { value: 'extreme', label: '极难' },
]

export default function BossesPage() {
  const [search, setSearch] = useState('')
  const [gameFilter, setGameFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc')

  // 计算每个 Boss 的关联攻略数
  const guideCountByBoss = useMemo(() => {
    const map = new Map<string, number>()
    for (const rel of guideRelations) {
      if (rel.targetType !== 'boss') continue
      map.set(rel.targetId, (map.get(rel.targetId) ?? 0) + 1)
    }
    return map
  }, [])

  // 计算地点标签（地图名 · 地点名）
  const locationLabelMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const loc of locations) {
      const mapName = getMapById(loc.mapId)?.name
      map.set(loc.id, mapName ? `${mapName} · ${loc.name}` : loc.name)
    }
    return map
  }, [])

  // 构建卡片数据
  const bossCards: BossCardData[] = useMemo(() => {
    return bosses.map((boss) => ({
      boss,
      gameName: getGameById(boss.gameId)?.name,
      locationLabel: boss.locationId ? locationLabelMap.get(boss.locationId) : undefined,
      relatedGuideCount: guideCountByBoss.get(boss.id) ?? 0,
    }))
  }, [guideCountByBoss, locationLabelMap])

  // 游戏筛选选项
  const gameOptions = useMemo(() => {
    const gameIds = [...new Set(bosses.map((b) => b.gameId))]
    return gameIds.map((gid) => ({
      value: gid,
      label: games.find((g) => g.id === gid)?.name ?? gid,
    }))
  }, [])

  // 搜索 + 筛选 + 排序
  const filtered = useMemo(() => {
    let result = bossCards

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.boss.name.toLowerCase().includes(q) ||
          c.boss.description?.toLowerCase().includes(q) ||
          c.gameName?.toLowerCase().includes(q) ||
          c.locationLabel?.toLowerCase().includes(q),
      )
    }

    if (gameFilter !== 'all') {
      result = result.filter((c) => c.boss.gameId === gameFilter)
    }

    if (difficultyFilter !== 'all') {
      result = result.filter((c) => c.boss.difficulty === difficultyFilter)
    }

    result = [...result].sort((a, b) => {
      const cmp = a.boss.name.localeCompare(b.boss.name, 'zh')
      return sortOrder === 'name-asc' ? cmp : -cmp
    })

    return result
  }, [bossCards, search, gameFilter, difficultyFilter, sortOrder])

  return (
    <>
      <PageHeader
        title="Boss 图鉴"
        description="收录所有游戏中的 Boss 数据，包括难度、阶段机制、所在地点和关联攻略。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: 'Boss 图鉴' }]}
      />

      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-3 pb-4 pt-2">
        <SearchInput
          placeholder="搜索 Boss…"
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

        {/* 难度筛选 */}
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="h-8 rounded-lg border border-border/60 bg-background/50 px-2.5 font-mono text-[11px] text-foreground/80 outline-none transition-colors focus:border-primary/40 focus:ring-1 focus:ring-primary/30"
        >
          {difficultyOptions.map((o) => (
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
        共 {filtered.length} 个 Boss
      </p>

      {/* Boss 网格 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((card) => (
            <BossCard key={card.boss.id} data={card} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Skull} title="没有找到匹配的 Boss" description="尝试调整筛选条件或搜索关键词。" />
      )}
    </>
  )
}
