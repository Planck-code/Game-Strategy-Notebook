import Image from 'next/image'
import { Gamepad2 } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'
import type { Game } from '@/mock'

// ============================================================
// GameHero — 游戏详情头部
//
// 展示游戏封面、名称、平台标签、简介和更新时间。
// 视觉风格与 WelcomeHero 保持一致。
// ============================================================

export function GameHero({ game }: { game: Game }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-xl md:p-8">
      {/* 背景光晕 */}
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-24 size-64 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row">
        {/* 封面 */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl sm:h-56 sm:w-80">
          {game.coverImage ? (
            <Image
              src={game.coverImage}
              alt={`${game.name} 封面`}
              fill
              className="object-cover"
              sizes="320px"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted/40">
              <Gamepad2 className="size-14 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* 信息 */}
        <div className="flex flex-col justify-center gap-2">
          {/* 游戏名称 */}
          <h1 className="text-2xl font-bold leading-tight">{game.name}</h1>
          {game.nameEn && (
            <p className="font-mono text-sm text-muted-foreground">{game.nameEn}</p>
          )}

          {/* 平台标签 */}
          {game.platforms && game.platforms.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {game.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium text-primary ring-1 ring-inset ring-primary/20"
                >
                  {p}
                </span>
              ))}
            </div>
          )}

          {/* 简介 */}
          {game.description && (
            <p className="max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
              {game.description}
            </p>
          )}

          {/* 元数据行 */}
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground/70">
            {game.developer && <span>{game.developer}</span>}
            {game.releaseDate && <span>发售：{game.releaseDate}</span>}
            <span>最近更新：{formatRelativeTime(game.updatedAt)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
