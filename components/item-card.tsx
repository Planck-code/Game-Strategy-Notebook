import { Package, Compass, BookOpen } from 'lucide-react'
import { EntityCard } from '@/components/entity-card'
import { Badge } from '@/components/ui/badge'
import { itemTypeLabels, itemRarityLabels, rarityVariant } from '@/lib/labels'
import type { Item } from '@/mock'

// ============================================================
// ItemCard — 道具卡片组件
//
// 基于 EntityCard，展示道具图标、名称、所属游戏、
// 类型/稀有度 Badge、获取方式和描述。
// ============================================================

export type ItemCardData = {
  item: Item
  gameName?: string
  relatedGuideCount: number
}

export function ItemCard({ data }: { data: ItemCardData }) {
  const { item, gameName, relatedGuideCount } = data

  return (
    <EntityCard
      href={`/items/${item.id}`}
      updatedAt={item.updatedAt}
      statIcon={BookOpen}
      statValue={relatedGuideCount}
      statLabel="篇攻略"
    >
      {/* 图标区 */}
      <div className="flex justify-center pt-6">
        <div className="flex size-16 items-center justify-center rounded-xl bg-muted/40 ring-1 ring-border/50">
          <Package className="size-7 text-muted-foreground/40" />
        </div>
      </div>

      {/* 信息区 */}
      <div className="flex flex-1 flex-col p-4 pt-3 text-center">
        {/* 名称 */}
        <h3 className="text-base font-semibold">{item.name}</h3>

        {/* 所属游戏 */}
        {gameName && (
          <p className="mt-0.5 font-mono text-[11px] text-primary/60">{gameName}</p>
        )}

        {/* 类型 + 稀有度 */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          <Badge variant="secondary" className="text-[10px]">
            {itemTypeLabel(item.type)}
          </Badge>
          {item.rarity && (
            <Badge variant={rarityVariant(item.rarity)} className="text-[10px]">
              {itemRarityLabel(item.rarity)}
            </Badge>
          )}
        </div>

        {/* 获取方式 */}
        {item.acquisition && (
          <div className="mt-2 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
            <Compass className="size-3 shrink-0" />
            <span className="line-clamp-1">{item.acquisition}</span>
          </div>
        )}

        {/* 描述 */}
        <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
          {item.description ?? '暂无描述'}
        </p>
      </div>
    </EntityCard>
  )
}

function itemTypeLabel(t: string): string {
  return itemTypeLabels[t] ?? t
}

function itemRarityLabel(r: string): string {
  return itemRarityLabels[r] ?? r
}
