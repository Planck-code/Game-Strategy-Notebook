'use client'

import Link from 'next/link'
import { BookOpen, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'

// ============================================================
// EntityCard — 通用实体卡片容器
//
// 提供统一的卡片外观：
// - 圆角边框 + 背景 + hover 抬升效果
// - 右上角跳转指示器
// - 可选统计行（图标 + 数值 + 标签）
// - 底部更新时间 footer
//
// children 插槽用于填入各实体专属的 body 内容。
// 用于 CharacterCard、BossCard 等实体卡片。
// ============================================================

export type EntityCardProps = {
  href: string
  updatedAt: string
  statIcon?: LucideIcon
  statValue?: number
  statLabel?: string
  children: React.ReactNode
}

export function EntityCard({
  href,
  updatedAt,
  statIcon: StatIcon = BookOpen,
  statValue,
  statLabel = '篇攻略',
  children,
}: EntityCardProps) {
  return (
    <Link href={href} className="block">
      <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/50 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
        {/* 跳转指示 */}
        <ArrowUpRight className="absolute right-3 top-3 z-10 size-4 text-foreground/70 opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Body */}
        {children}

        {/* 底部：统计 + 更新时间 */}
        <div className="mt-auto border-t border-border/40 p-4 pt-3">
          {/* 统计行 */}
          {statValue !== undefined && (
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <StatIcon className="size-3 shrink-0" />
              <span className="font-mono text-xs font-medium text-foreground/80">
                {statValue}
              </span>
              <span>{statLabel}</span>
            </div>
          )}

          {/* 更新时间 */}
          <div
            className={`flex items-center justify-between ${statValue !== undefined ? 'mt-2 pt-2 border-t border-border/30' : ''}`}
          >
            <span className="font-mono text-[10px] text-muted-foreground/60">
              最近更新
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {formatRelativeTime(updatedAt)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
