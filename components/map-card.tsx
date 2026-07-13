import { MapPin, Skull, ScrollText, Map as MapIcon } from 'lucide-react'
import { EntityCard } from '@/components/entity-card'
import type { Map as GameMap } from '@/mock'

// ============================================================
// MapCard — 地图卡片组件
//
// 基于 EntityCard，展示地图封面、名称、所属游戏、
// 地点/Boss/任务统计和描述。
// ============================================================

export type MapCardData = {
  map: GameMap
  gameName?: string
  locationCount: number
  bossCount: number
  questCount: number
}

export function MapCard({ data }: { data: MapCardData }) {
  const { map, gameName, locationCount, bossCount, questCount } = data

  const stats = [
    { icon: MapPin, value: locationCount, label: '地点' },
    { icon: Skull, value: bossCount, label: 'Boss' },
    { icon: ScrollText, value: questCount, label: '任务' },
  ]

  return (
    <EntityCard href={`/maps/${map.id}`} updatedAt={map.updatedAt}>
      {/* 封面 */}
      <div className="relative h-32 overflow-hidden">
        {map.imageUrl ? (
          <img
            src={map.imageUrl}
            alt={`${map.name} 地图`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted/30">
            <MapIcon className="size-12 text-muted-foreground/25" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
      </div>

      {/* 信息区 */}
      <div className="flex flex-1 flex-col p-4 pt-0 text-center">
        <h3 className="text-base font-semibold">{map.name}</h3>

        {gameName && (
          <p className="mt-0.5 font-mono text-[11px] text-primary/60">{gameName}</p>
        )}

        {/* 三项统计 */}
        <div className="mt-3 flex items-center justify-center gap-4">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <span
                key={s.label}
                className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"
              >
                <Icon className="size-3 shrink-0" />
                <span className="font-mono text-xs font-medium text-foreground/80">
                  {s.value}
                </span>
                <span>{s.label}</span>
              </span>
            )
          })}
        </div>

        {/* 描述 */}
        <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
          {map.description ?? '暂无描述'}
        </p>
      </div>
    </EntityCard>
  )
}
