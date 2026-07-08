import Image from 'next/image'
import { Clock, FileText, ArrowUpRight } from 'lucide-react'
import { recentStrategies } from '@/lib/mock-data'
import { Progress } from '@/components/ui/progress'

export function RecentStrategies() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Clock className="size-4 text-primary" />
          最近编辑
        </h2>
        <button className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary">
          查看全部
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {recentStrategies.map((s) => (
          <article
            key={s.id}
            className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/50 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="relative h-28 overflow-hidden">
              <Image
                src={s.cover || '/placeholder.svg'}
                alt={`${s.game} 攻略封面`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <span
                className="absolute left-3 top-3 rounded-md px-2 py-0.5 font-mono text-[10px] font-medium backdrop-blur-md"
                style={{ backgroundColor: 'oklch(0 0 0 / 0.45)', color: s.accent }}
              >
                {s.tag}
              </span>
              <ArrowUpRight className="absolute right-3 top-3 size-4 text-foreground/70 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="p-3.5">
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                {s.game}
              </p>
              <h3 className="mt-1 line-clamp-1 text-sm font-semibold">{s.title}</h3>

              <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileText className="size-3" />
                  {s.wordCount.toLocaleString()} 字
                </span>
                <span>{s.updatedAt}</span>
              </div>

              <div className="mt-2.5 flex items-center gap-2">
                <Progress value={s.progress} className="h-1.5 flex-1" />
                <span className="font-mono text-[10px] text-muted-foreground">{s.progress}%</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
