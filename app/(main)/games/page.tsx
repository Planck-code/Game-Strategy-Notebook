'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown, Gamepad2 } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { SearchInput } from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import { GameCard, type GameCardStats } from '@/components/game-card'
import {
  games,
  getGuidesByGameId,
  getCharactersByGameId,
  getBossesByGameId,
  getMapsByGameId,
  getQuestsByGameId,
} from '@/mock'

// ============================================================
// 游戏库页面
//
// 展示所有游戏卡片，支持搜索和按名称排序。
// 数据通过 mock/index.ts 统一入口获取。
// ============================================================

type SortOrder = 'name-asc' | 'name-desc'

export default function GamesPage() {
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc')

  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'name-asc' ? 'name-desc' : 'name-asc'))
  }

  // 为每个游戏计算统计数据
  const gamesWithStats = useMemo(() => {
    return games.map((game) => ({
      game,
      stats: {
        guideCount: getGuidesByGameId(game.id).length,
        characterCount: getCharactersByGameId(game.id).length,
        bossCount: getBossesByGameId(game.id).length,
        mapCount: getMapsByGameId(game.id).length,
        questCount: getQuestsByGameId(game.id).length,
      } satisfies GameCardStats,
    }))
  }, [])

  // 搜索 + 排序
  const filtered = useMemo(() => {
    let result = gamesWithStats

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (g) =>
          g.game.name.toLowerCase().includes(q) ||
          g.game.description?.toLowerCase().includes(q) ||
          g.game.nameEn?.toLowerCase().includes(q),
      )
    }

    result = [...result].sort((a, b) => {
      const cmp = a.game.name.localeCompare(b.game.name, 'zh')
      return sortOrder === 'name-asc' ? cmp : -cmp
    })

    return result
  }, [gamesWithStats, search, sortOrder])

  return (
    <>
      <PageHeader
        title="游戏库"
        description="管理你的所有游戏攻略资源，按游戏分类整理内容。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '游戏库' }]}
      />

      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-3 pb-4 pt-2">
        <SearchInput
          placeholder="搜索游戏…"
          shortcut=""
          className="max-w-xs flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSort}
          className="shrink-0 gap-1.5"
        >
          <ArrowUpDown className="size-3.5" />
          名称{sortOrder === 'name-asc' ? ' ↑' : ' ↓'}
        </Button>
      </div>

      {/* 结果计数 */}
      <p className="pb-3 font-mono text-[11px] text-muted-foreground">
        共 {filtered.length} 款游戏
      </p>

      {/* 游戏网格 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ game, stats }) => (
            <GameCard key={game.id} game={game} stats={stats} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Gamepad2} title="没有找到匹配的游戏" description="尝试调整筛选条件或搜索关键词。" />
      )}
    </>
  )
}
