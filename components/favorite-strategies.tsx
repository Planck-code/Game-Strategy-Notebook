import Image from 'next/image'
import { Star } from 'lucide-react'
import { favoriteStrategies } from '@/lib/mock-data'

export function FavoriteStrategies() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Star className="size-4 text-primary" />
          收藏攻略
        </h2>
        <button className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary">
          管理收藏
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {favoriteStrategies.map((f) => (
          <article
            key={f.id}
            className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card/50 p-2.5 backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-card/80"
          >
            <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={f.icon || '/placeholder.svg'}
                alt={`${f.game} 图标`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="44px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-1 text-sm font-medium">{f.title}</h3>
              <p className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                <span className="truncate">{f.game}</span>
                <span className="rounded bg-muted px-1.5 py-px text-muted-foreground">
                  {f.category}
                </span>
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
              <Star className="size-3 fill-primary/70 text-primary" />
              {f.stars}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
