'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown, Filter, Package } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { SearchInput } from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import { ItemCard, type ItemCardData } from '@/components/item-card'
import { itemTypeLabels, itemRarityLabels, toSelectOptionsWithAll } from '@/lib/labels'
import { items, games, guideRelations, getGameById } from '@/mock'

// ============================================================
// 道具页面
//
// 以卡片网格展示所有道具。
// 支持搜索、按游戏/类型/稀有度筛选、按名称排序。
// ============================================================

type SortOrder = 'name-asc' | 'name-desc'

const typeOptions = toSelectOptionsWithAll(itemTypeLabels, '全部类型')
const rarityOptions = toSelectOptionsWithAll(itemRarityLabels, '全部稀有度')

export default function ItemsPage() {
  const [search, setSearch] = useState('')
  const [gameFilter, setGameFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [rarityFilter, setRarityFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc')

  // 计算每个道具的关联攻略数
  const guideCountByItem = useMemo(() => {
    const map = new Map<string, number>()
    for (const rel of guideRelations) {
      if (rel.targetType !== 'item') continue
      map.set(rel.targetId, (map.get(rel.targetId) ?? 0) + 1)
    }
    return map
  }, [])

  // 构建卡片数据
  const itemCards: ItemCardData[] = useMemo(() => {
    return items.map((item) => ({
      item,
      gameName: getGameById(item.gameId)?.name,
      relatedGuideCount: guideCountByItem.get(item.id) ?? 0,
    }))
  }, [guideCountByItem])

  // 游戏筛选选项
  const gameOptions = useMemo(() => {
    const gameIds = [...new Set(items.map((i) => i.gameId))]
    return gameIds.map((gid) => ({
      value: gid,
      label: games.find((g) => g.id === gid)?.name ?? gid,
    }))
  }, [])

  // 搜索 + 筛选 + 排序
  const filtered = useMemo(() => {
    let result = itemCards

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.item.name.toLowerCase().includes(q) ||
          c.item.description?.toLowerCase().includes(q) ||
          c.item.acquisition?.toLowerCase().includes(q) ||
          c.gameName?.toLowerCase().includes(q),
      )
    }

    if (gameFilter !== 'all') {
      result = result.filter((c) => c.item.gameId === gameFilter)
    }

    if (typeFilter !== 'all') {
      result = result.filter((c) => c.item.type === typeFilter)
    }

    if (rarityFilter !== 'all') {
      result = result.filter((c) => c.item.rarity === rarityFilter)
    }

    result = [...result].sort((a, b) => {
      const cmp = a.item.name.localeCompare(b.item.name, 'zh')
      return sortOrder === 'name-asc' ? cmp : -cmp
    })

    return result
  }, [itemCards, search, gameFilter, typeFilter, rarityFilter, sortOrder])

  return (
    <>
      <PageHeader
        title="道具"
        description="整理游戏道具数据、合成配方和获取途径。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '道具' }]}
      />

      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-3 pb-4 pt-2">
        <SearchInput
          placeholder="搜索道具…"
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

        {/* 稀有度筛选 */}
        <select
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
          className="h-8 rounded-lg border border-border/60 bg-background/50 px-2.5 font-mono text-[11px] text-foreground/80 outline-none transition-colors focus:border-primary/40 focus:ring-1 focus:ring-primary/30"
        >
          {rarityOptions.map((o) => (
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
        共 {filtered.length} 个道具
      </p>

      {/* 道具网格 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((card) => (
            <ItemCard key={card.item.id} data={card} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Package} title="没有找到匹配的道具" description="尝试调整筛选条件或搜索关键词。" />
      )}
    </>
  )
}
