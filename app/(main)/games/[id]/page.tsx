'use client'

import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import {
  BookOpen,
  Users,
  Skull,
  Map,
  ScrollText,
  Package,
  Clock,
  Gamepad2,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { GameHero } from '@/components/game-hero'
import { GameStatsGrid, type StatItem } from '@/components/game-stats-grid'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  getGameById,
  getGuidesByGameId,
  getCharactersByGameId,
  getBossesByGameId,
  getMapsByGameId,
  getQuestsByGameId,
  getItemsByGameId,
  getTimelineEventsByGameId,
  statusLabels,
  type Guide,
  type Character,
  type Boss,
  type Map as GameMap,
  type Quest,
  type Item,
  type TimelineEvent,
} from '@/mock'
import {
  difficultyLabels,
  questTypeLabels,
  questStatusLabels,
  itemTypeLabels,
  itemRarityLabels,
  timelineTypeLabels,
} from '@/lib/labels'

// ============================================================
// 游戏详情页
//
// 展示单个游戏的完整信息：
// Hero + 统计卡片 + 7 个 Tab（攻略/人物/Boss/地图/任务/道具/时间线）
// ============================================================

export default function GameDetailPage() {
  const params = useParams()
  const id = typeof params.id === 'string' ? params.id : ''

  const game = useMemo(() => getGameById(id), [id])

  // 所有关联数据
  const data = useMemo(() => {
    if (!game) return null
    return {
      guides: getGuidesByGameId(game.id),
      characters: getCharactersByGameId(game.id),
      bosses: getBossesByGameId(game.id),
      maps: getMapsByGameId(game.id),
      quests: getQuestsByGameId(game.id),
      items: getItemsByGameId(game.id),
      timelineEvents: getTimelineEventsByGameId(game.id),
    }
  }, [game])

  // ---- 404 ----
  if (!game) {
    return (
      <>
        <PageHeader
          title="游戏未找到"
          breadcrumbs={[
            { label: '首页', href: '/' },
            { label: '游戏库', href: '/games' },
            { label: '游戏详情' },
          ]}
        />
        <EmptyState
          icon={Gamepad2}
          title="游戏不存在"
          description="该游戏可能已被移除，或链接地址有误。"
        />
      </>
    )
  }

  // ---- 统计数据 ----
  const stats: StatItem[] = [
    { label: '攻略', value: data!.guides.length, icon: BookOpen },
    { label: '人物', value: data!.characters.length, icon: Users },
    { label: 'Boss', value: data!.bosses.length, icon: Skull },
    { label: '地图', value: data!.maps.length, icon: Map },
    { label: '任务', value: data!.quests.length, icon: ScrollText },
    { label: '道具', value: data!.items.length, icon: Package },
  ]

  return (
    <>
      <PageHeader
        title={game.name}
        breadcrumbs={[
          { label: '首页', href: '/' },
          { label: '游戏库', href: '/games' },
          { label: game.name },
        ]}
      />

      <div className="space-y-6">
        {/* 头部信息 */}
        <GameHero game={game} />

        {/* 统计卡片 */}
        <GameStatsGrid items={stats} />

        {/* Tabs */}
        <Tabs defaultValue="guides">
          <TabsList className="w-full overflow-x-auto">
            <TabTriggers data={data!} />
          </TabsList>

          <TabsContent value="guides">
            <GuideList guides={data!.guides} />
          </TabsContent>
          <TabsContent value="characters">
            <SimpleEntityList
              items={data!.characters}
              emptyMessage="暂无人物资料"
              renderMeta={(c: Character) => (
                <>
                  {c.role && <Badge variant="secondary">{c.role}</Badge>}
                  {c.faction && (
                    <span className="text-[11px] text-muted-foreground">{c.faction}</span>
                  )}
                </>
              )}
            />
          </TabsContent>
          <TabsContent value="bosses">
            <SimpleEntityList
              items={data!.bosses}
              emptyMessage="暂无 Boss 资料"
              renderMeta={(b: Boss) => (
                <>
                  {b.difficulty && (
                    <Badge variant={b.difficulty === 'extreme' ? 'destructive' : 'secondary'}>
                      {difficultyLabel(b.difficulty)}
                    </Badge>
                  )}
                  {b.phases && (
                    <span className="text-[11px] text-muted-foreground">{b.phases} 阶段</span>
                  )}
                </>
              )}
            />
          </TabsContent>
          <TabsContent value="maps">
            <SimpleEntityList
              items={data!.maps}
              emptyMessage="暂无地图"
              renderMeta={() => null}
            />
          </TabsContent>
          <TabsContent value="quests">
            <SimpleEntityList
              items={data!.quests}
              emptyMessage="暂无任务"
              renderMeta={(q: Quest) => (
                <>
                  <Badge variant="secondary">{questTypeLabel(q.type)}</Badge>
                  <span className="text-[11px] text-muted-foreground">{questStatusLabel(q.status)}</span>
                </>
              )}
            />
          </TabsContent>
          <TabsContent value="items">
            <SimpleEntityList
              items={data!.items}
              emptyMessage="暂无道具"
              renderMeta={(i: Item) => (
                <>
                  {i.rarity && <Badge variant="secondary">{itemRarityLabel(i.rarity)}</Badge>}
                  <span className="text-[11px] text-muted-foreground">{itemTypeLabel(i.type)}</span>
                </>
              )}
            />
          </TabsContent>
          <TabsContent value="timeline">
            <TimelineList events={data!.timelineEvents} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

// ============================================================
// Tab 触发器（带数量标记）
// ============================================================

function TabTriggers({
  data,
}: {
  data: {
    guides: Guide[]
    characters: Character[]
    bosses: Boss[]
    maps: GameMap[]
    quests: Quest[]
    items: Item[]
    timelineEvents: TimelineEvent[]
  }
}) {
  const tabs = [
    { key: 'guides', label: '攻略', count: data.guides.length },
    { key: 'characters', label: '人物', count: data.characters.length },
    { key: 'bosses', label: 'Boss', count: data.bosses.length },
    { key: 'maps', label: '地图', count: data.maps.length },
    { key: 'quests', label: '任务', count: data.quests.length },
    { key: 'items', label: '道具', count: data.items.length },
    { key: 'timeline', label: '时间线', count: data.timelineEvents.length },
  ]

  return (
    <>
      {tabs.map((tab) => (
        <TabsTrigger key={tab.key} value={tab.key}>
          {tab.label}
          <span className="ml-1 font-mono text-[10px] text-muted-foreground">
            {tab.count}
          </span>
        </TabsTrigger>
      ))}
    </>
  )
}

// ============================================================
// 攻略列表
// ============================================================

function GuideList({ guides }: { guides: Guide[] }) {
  if (guides.length === 0) {
    return <EmptyState icon={BookOpen} title="暂无攻略" description="该游戏还没有创建任何攻略。" />
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {guides.map((g) => (
        <div
          key={g.id}
          className="rounded-xl border border-border/60 bg-card/40 p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold">{g.title}</h4>
              {g.description && (
                <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
                  {g.description}
                </p>
              )}
            </div>
            <Badge variant="secondary" className="shrink-0 text-[10px]">
              {g.status in statusLabels
                ? statusLabels[g.status as keyof typeof statusLabels]
                : g.status}
            </Badge>
          </div>
          {g.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {g.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground ring-1 ring-inset ring-border/40"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ============================================================
// 通用实体列表（Character / Boss / Map / Quest / Item）
// ============================================================

type EntityWithDescription = { id: string; name: string; description?: string }

function SimpleEntityList<T extends EntityWithDescription>({
  items,
  emptyMessage,
  renderMeta,
}: {
  items: T[]
  emptyMessage: string
  renderMeta: (item: T) => React.ReactNode
}) {
  if (items.length === 0) {
    return <EmptyState icon={Package} title={emptyMessage} description="该分类暂无数据。" />
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/40 p-3.5 transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
        >
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-medium">{item.name}</h4>
            {item.description && (
              <p className="mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            {renderMeta(item)}
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// 时间线列表
// ============================================================

function TimelineList({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return <EmptyState icon={Clock} title="暂无时间线" description="该游戏还没有时间线事件。" />
  }

  return (
    <div className="space-y-2">
      {events
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/40 p-3.5 transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
          >
            {/* 时间线色点 */}
            <div
              className="mt-1.5 size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: event.color ?? 'oklch(0.62 0.18 255)' }}
            />

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-medium">{event.title}</h4>
              {event.description && (
                <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1">
              <Badge variant="secondary" className="text-[10px]">
                {timelineTypeLabel(event.type)}
              </Badge>
              <span className="font-mono text-[10px] text-muted-foreground">{event.date}</span>
            </div>
          </div>
        ))}
    </div>
  )
}

function difficultyLabel(d: string): string {
  return difficultyLabels[d] ?? d
}

function questTypeLabel(t: string): string {
  return questTypeLabels[t] ?? t
}

function questStatusLabel(s: string): string {
  return questStatusLabels[s] ?? s
}

function itemTypeLabel(t: string): string {
  return itemTypeLabels[t] ?? t
}

function itemRarityLabel(r: string): string {
  return itemRarityLabels[r] ?? r
}

function timelineTypeLabel(t: string): string {
  return timelineTypeLabels[t] ?? t
}
