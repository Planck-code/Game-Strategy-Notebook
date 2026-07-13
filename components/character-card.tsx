import { User, BookOpen } from 'lucide-react'
import { EntityCard } from '@/components/entity-card'
import { Badge } from '@/components/ui/badge'
import type { Character } from '@/mock'

// ============================================================
// CharacterCard — 人物卡片组件
//
// 基于 EntityCard，展示人物头像、名称、所属游戏、
// 身份/阵营、简介。容器与 footer 由 EntityCard 提供。
// ============================================================

export type CharacterCardData = {
  character: Character
  gameName?: string
  relatedGuideCount: number
}

export function CharacterCard({ data }: { data: CharacterCardData }) {
  const { character: char, gameName, relatedGuideCount } = data

  return (
    <EntityCard
      href={`/characters/${char.id}`}
      updatedAt={char.updatedAt}
      statIcon={BookOpen}
      statValue={relatedGuideCount}
      statLabel="篇攻略"
    >
      {/* 头像区 */}
      <div className="flex justify-center pt-6">
        <div className="flex size-20 items-center justify-center rounded-full bg-muted/50 ring-1 ring-border/60">
          {char.avatarImage ? (
            <img
              src={char.avatarImage}
              alt={`${char.name} 头像`}
              className="size-full rounded-full object-cover"
            />
          ) : (
            <User className="size-9 text-muted-foreground/40" />
          )}
        </div>
      </div>

      {/* 信息区 */}
      <div className="flex flex-1 flex-col p-4 pt-3 text-center">
        {/* 名称 */}
        <h3 className="text-base font-semibold">{char.name}</h3>

        {/* 所属游戏 */}
        {gameName && (
          <p className="mt-0.5 font-mono text-[11px] text-primary/60">{gameName}</p>
        )}

        {/* 身份 / 阵营 */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          {char.role && (
            <Badge variant="secondary" className="text-[10px]">
              {char.role}
            </Badge>
          )}
          {char.faction && (
            <Badge variant="outline" className="text-[10px]">
              {char.faction}
            </Badge>
          )}
        </div>

        {/* 简介 */}
        {char.description && (
          <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
            {char.description}
          </p>
        )}
      </div>
    </EntityCard>
  )
}
