'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown, Filter } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { SearchInput } from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import { CharacterCard, type CharacterCardData } from '@/components/character-card'
import { characters, games, guideRelations, getGameById } from '@/mock'

// ============================================================
// 人物资料页面
//
// 以卡片网格展示所有人物角色。
// 支持搜索、按游戏筛选、按阵营筛选、按名称排序。
// ============================================================

type SortOrder = 'name-asc' | 'name-desc'

export default function CharactersPage() {
  const [search, setSearch] = useState('')
  const [gameFilter, setGameFilter] = useState('all')
  const [factionFilter, setFactionFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc')

  // 计算每个角色的关联攻略数
  const guideCountByCharacter = useMemo(() => {
    const map = new Map<string, number>()
    for (const rel of guideRelations) {
      if (rel.targetType !== 'character') continue
      // 同一 guide 可能多次关联同一角色（多条 relation），
      // 这里统计 relation 条数作为关联度
      map.set(rel.targetId, (map.get(rel.targetId) ?? 0) + 1)
    }
    return map
  }, [])

  // 构建卡片数据
  const characterCards: CharacterCardData[] = useMemo(() => {
    return characters.map((char) => ({
      character: char,
      gameName: getGameById(char.gameId)?.name,
      relatedGuideCount: guideCountByCharacter.get(char.id) ?? 0,
    }))
  }, [guideCountByCharacter])

  // 筛选选项（从数据中动态提取）
  const gameOptions = useMemo(() => {
    const gameIds = [...new Set(characters.map((c) => c.gameId))]
    return gameIds.map((gid) => ({ value: gid, label: games.find((g) => g.id === gid)?.name ?? gid }))
  }, [])

  const factionOptions = useMemo(() => {
    const factions = [...new Set(characters.map((c) => c.faction).filter(Boolean))] as string[]
    return factions.sort()
  }, [])

  // 搜索 + 筛选 + 排序
  const filtered = useMemo(() => {
    let result = characterCards

    // 搜索
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.character.name.toLowerCase().includes(q) ||
          c.character.description?.toLowerCase().includes(q) ||
          c.character.role?.toLowerCase().includes(q) ||
          c.gameName?.toLowerCase().includes(q),
      )
    }

    // 游戏筛选
    if (gameFilter !== 'all') {
      result = result.filter((c) => c.character.gameId === gameFilter)
    }

    // 阵营筛选
    if (factionFilter !== 'all') {
      result = result.filter((c) => c.character.faction === factionFilter)
    }

    // 排序
    result = [...result].sort((a, b) => {
      const cmp = a.character.name.localeCompare(b.character.name, 'zh')
      return sortOrder === 'name-asc' ? cmp : -cmp
    })

    return result
  }, [characterCards, search, gameFilter, factionFilter, sortOrder])

  return (
    <>
      <PageHeader
        title="人物资料"
        description="整理游戏角色信息、关系图谱、技能数据和背景故事。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '人物资料' }]}
      />

      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-3 pb-4 pt-2">
        <SearchInput
          placeholder="搜索人物…"
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

        {/* 阵营筛选 */}
        <select
          value={factionFilter}
          onChange={(e) => setFactionFilter(e.target.value)}
          className="h-8 rounded-lg border border-border/60 bg-background/50 px-2.5 font-mono text-[11px] text-foreground/80 outline-none transition-colors focus:border-primary/40 focus:ring-1 focus:ring-primary/30"
        >
          <option value="all">全部阵营</option>
          {factionOptions.map((f) => (
            <option key={f} value={f}>
              {f}
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
        共 {filtered.length} 位人物
      </p>

      {/* 人物网格 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((card) => (
            <CharacterCard key={card.character.id} data={card} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/30 px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">没有找到匹配的人物</p>
        </div>
      )}
    </>
  )
}
