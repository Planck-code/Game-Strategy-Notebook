'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Users, Skull, Map, ScrollText, ArrowUpRight, Gamepad2 } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'
import type { Game } from '@/mock'

// ============================================================
// GameCardStats — 游戏统计数据
// ============================================================

export type GameCardStats = {
  guideCount: number
  characterCount: number
  bossCount: number
  mapCount: number
  questCount: number
}

// ============================================================
// GameCard — 游戏卡片组件
//
// 展示游戏的封面、名称、简介、各项统计数据和更新时间。
// 点击跳转到 /games/[id] 游戏详情页。
// ============================================================

export function GameCard({ game, stats }: { game: Game; stats: GameCardStats }) {
  const statItems = [
    { icon: BookOpen, value: stats.guideCount, label: '攻略' },
    { icon: Users, value: stats.characterCount, label: '人物' },
    { icon: Skull, value: stats.bossCount, label: 'Boss' },
    { icon: Map, value: stats.mapCount, label: '地图' },
    { icon: ScrollText, value: stats.questCount, label: '任务' },
  ]

  return (
    <Link href={`/games/${game.id}`} className="block">
      <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/50 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
        {/* 封面图 */}
        <div className="relative h-36 overflow-hidden">
          {game.coverImage ? (
            <Image
              src={game.coverImage}
              alt={`${game.name} 封面`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted/30">
              <Gamepad2 className="size-10 text-muted-foreground/40" />
            </div>
          )}
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

          {/* 平台标签 */}
          {game.platforms && game.platforms.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-1">
              {game.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-md bg-black/45 px-2 py-0.5 font-mono text-[10px] font-medium text-white/80 backdrop-blur-md"
                >
                  {p}
                </span>
              ))}
            </div>
          )}

          {/* 跳转指示 */}
          <ArrowUpRight className="absolute right-3 top-3 size-4 text-foreground/70 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        {/* 信息区 */}
        <div className="flex flex-1 flex-col p-4">
          {/* 游戏名 */}
          <h3 className="text-base font-semibold">{game.name}</h3>
          {game.nameEn && (
            <p className="font-mono text-[11px] text-muted-foreground">{game.nameEn}</p>
          )}

          {/* 简介 */}
          {game.description && (
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
              {game.description}
            </p>
          )}

          {/* 统计 */}
          <div className="mt-auto pt-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {statItems.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"
                >
                  <item.icon className="size-3 shrink-0" />
                  <span className="font-mono text-xs font-medium text-foreground/80">
                    {item.value}
                  </span>
                  <span>{item.label}</span>
                </span>
              ))}
            </div>

            {/* 更新时间 */}
            <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
              <span className="font-mono text-[10px] text-muted-foreground/60">
                最近更新
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {formatRelativeTime(game.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
