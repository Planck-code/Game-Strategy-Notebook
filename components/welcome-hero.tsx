import Link from 'next/link'
import { FileText, Sparkles, Eye, Users } from 'lucide-react'
import { workspaceStats } from '@/lib/mock-data'

const stats = [
  { label: '攻略总数', value: workspaceStats.totalStrategies, icon: FileText },
  { label: '本周发布', value: workspaceStats.publishedThisWeek, icon: Sparkles },
  { label: '总浏览量', value: workspaceStats.totalViews, icon: Eye },
  { label: '关注者', value: workspaceStats.followers, icon: Users },
]

export function WelcomeHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-xl md:p-8">
      {/* 背景光晕点缀 */}
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-24 size-64 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative">
        <p className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          晚上好，攻略猎人
        </p>
        <h1 className="text-balance text-2xl font-bold leading-tight md:text-3xl">
          今天想为哪款游戏
          <span className="text-primary"> 打造新攻略</span>？
        </h1>
        <p className="mt-2 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
          在一个工作区内整理游戏库、人物、地图与任务，随时把灵感沉淀为结构化的攻略内容。
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <Link
                key={s.label}
                href={s.label === '攻略总数' || s.label === '本周发布' ? '/guides' : '/games'}
                className="block rounded-xl border border-border/60 bg-background/40 p-3 transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
              >
                <Icon className="mb-2 size-4 text-primary" />
                <p className="font-mono text-lg font-semibold leading-none">{s.value}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{s.label}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
