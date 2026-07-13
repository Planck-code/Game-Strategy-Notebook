'use client'

import Link from 'next/link'
import { User, BookOpen, ArrowUpRight } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { Character } from '@/mock'

// ============================================================
// CharacterCard — 人物卡片组件
//
// 展示人物头像、名称、所属游戏、身份/阵营、简介、
// 关联攻略数和更新时间。
// 点击跳转到 /characters/[id]。
// 视觉风格与 GameCard 保持一致。
// ============================================================

export type CharacterCardData = {
  character: Character
  gameName?: string
  relatedGuideCount: number
}

export function CharacterCard({ data }: { data: CharacterCardData }) {
  const { character: char, gameName, relatedGuideCount } = data

  return (
    <Link href={`/characters/${char.id}`} className="block">
      <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/50 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
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

        {/* 跳转指示 */}
        <ArrowUpRight className="absolute right-3 top-3 size-4 text-foreground/70 opacity-0 transition-opacity group-hover:opacity-100" />

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

          {/* 统计 + 更新时间 */}
          <div className="mt-auto pt-3">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <BookOpen className="size-3 shrink-0" />
              <span className="font-mono text-xs font-medium text-foreground/80">
                {relatedGuideCount}
              </span>
              <span>篇攻略</span>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
              <span className="font-mono text-[10px] text-muted-foreground/60">
                最近更新
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {formatRelativeTime(char.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
