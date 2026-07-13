import type { LucideIcon } from 'lucide-react'

// ============================================================
// GameStatsGrid — 统计数据卡片网格
//
// 通用的统计卡片行，接收 { label, value, icon } 数组。
// 可用于游戏详情、Dashboard 等页面。
// 视觉风格与 WelcomeHero 统计区保持一致。
// ============================================================

export type StatItem = {
  label: string
  value: number
  icon: LucideIcon
}

export function GameStatsGrid({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.label}
            className="rounded-xl border border-border/60 bg-background/40 p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
          >
            <Icon className="mb-2 size-4 text-primary" />
            <p className="font-mono text-xl font-semibold leading-none">{item.value}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{item.label}</p>
          </div>
        )
      })}
    </div>
  )
}
