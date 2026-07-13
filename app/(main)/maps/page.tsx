'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown, Filter, Map } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { SearchInput } from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import { MapCard, type MapCardData } from '@/components/map-card'
import {
  maps,
  games,
  locations,
  bosses,
  quests,
  getGameById,
} from '@/mock'

// ============================================================
// 地图页面
//
// 以卡片网格展示所有地图。
// 支持搜索、按游戏筛选、按名称排序。
// ============================================================

type SortOrder = 'name-asc' | 'name-desc'

export default function MapsPage() {
  const [search, setSearch] = useState('')
  const [gameFilter, setGameFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc')

  // 构建卡片数据
  const mapCards: MapCardData[] = useMemo(() => {
    return maps.map((map) => {
      // 该地图上的地点
      const mapLocations = locations.filter((l) => l.mapId === map.id)
      const locationIds = new Set(mapLocations.map((l) => l.id))

      // 地点数
      const locationCount = mapLocations.length

      // Boss 数：Boss 的 locationId 属于该地图的地点
      const bossCount = bosses.filter(
        (b) => b.locationId && locationIds.has(b.locationId),
      ).length

      // 任务数：同游戏的任务
      const questCount = quests.filter((q) => q.gameId === map.gameId).length

      return {
        map,
        gameName: getGameById(map.gameId)?.name,
        locationCount,
        bossCount,
        questCount,
      }
    })
  }, [])

  // 游戏筛选选项
  const gameOptions = useMemo(() => {
    const gameIds = [...new Set(maps.map((m) => m.gameId))]
    return gameIds.map((gid) => ({
      value: gid,
      label: games.find((g) => g.id === gid)?.name ?? gid,
    }))
  }, [])

  // 搜索 + 筛选 + 排序
  const filtered = useMemo(() => {
    let result = mapCards

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.map.name.toLowerCase().includes(q) ||
          c.map.description?.toLowerCase().includes(q) ||
          c.gameName?.toLowerCase().includes(q),
      )
    }

    if (gameFilter !== 'all') {
      result = result.filter((c) => c.map.gameId === gameFilter)
    }

    result = [...result].sort((a, b) => {
      const cmp = a.map.name.localeCompare(b.map.name, 'zh')
      return sortOrder === 'name-asc' ? cmp : -cmp
    })

    return result
  }, [mapCards, search, gameFilter, sortOrder])

  return (
    <>
      <PageHeader
        title="地图"
        description="标注游戏地图、标记关键地点、规划探索路线。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '地图' }]}
      />

      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-3 pb-4 pt-2">
        <SearchInput
          placeholder="搜索地图…"
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
        共 {filtered.length} 张地图
      </p>

      {/* 地图网格 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((card) => (
            <MapCard key={card.map.id} data={card} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Map} title="没有找到匹配的地图" description="尝试调整筛选条件或搜索关键词。" />
      )}
    </>
  )
}
