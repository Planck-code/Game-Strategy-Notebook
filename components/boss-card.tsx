import { BookOpen, Skull, Swords } from 'lucide-react'
import { EntityCard } from '@/components/entity-card'
import { Badge } from '@/components/ui/badge'
import { difficultyLabels, difficultyVariant } from '@/lib/labels'
import type { Boss } from '@/mock'

// ============================================================
// BossCard — Boss 卡片组件
//
// 基于 EntityCard，展示 Boss 专属信息：
// 图片占位、名称、所属游戏、所在地点、难度、阶段、简介。
// ============================================================

export type BossCardData = {
  boss: Boss
  gameName?: string
  locationLabel?: string
  relatedGuideCount: number
}

export function BossCard({ data }: { data: BossCardData }) {
  const { boss, gameName, locationLabel, relatedGuideCount } = data

  return (
    <EntityCard
      href={`/bosses/${boss.id}`}
      updatedAt={boss.updatedAt}
      statIcon={BookOpen}
      statValue={relatedGuideCount}
      statLabel="篇攻略"
    >
      {/* 图片区 */}
      <div className="relative h-32 overflow-hidden">
        {boss.imageUrl ? (
          <img
            src={boss.imageUrl}
            alt={`${boss.name} 图片`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted/30">
            <Skull className="size-12 text-muted-foreground/25" />
          </div>
        )}
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        {/* 难度徽章（左上角） */}
        {boss.difficulty && (
          <div className="absolute left-3 top-3">
            <Badge variant={difficultyVariant(boss.difficulty)} className="text-[10px]">
              {difficultyLabel(boss.difficulty)}
            </Badge>
          </div>
        )}
      </div>

      {/* 信息区 */}
      <div className="flex flex-1 flex-col p-4 pt-0 text-center">
        {/* 名称 */}
        <h3 className="text-base font-semibold">{boss.name}</h3>

        {/* 所属游戏 */}
        {gameName && (
          <p className="mt-0.5 font-mono text-[11px] text-primary/60">{gameName}</p>
        )}

        {/* 地点 */}
        {locationLabel && (
          <div className="mt-1.5 flex items-center justify-center gap-1">
            <Swords className="size-3 text-muted-foreground/50" />
            <span className="text-[11px] text-muted-foreground">{locationLabel}</span>
          </div>
        )}

        {/* 阶段数 */}
        {boss.phases && (
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            {boss.phases} 阶段战斗
          </p>
        )}

        {/* 简介 */}
        <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
          {boss.description ?? '暂无介绍'}
        </p>
      </div>
    </EntityCard>
  )
}

function difficultyLabel(d: string): string {
  return difficultyLabels[d] ?? d
}
