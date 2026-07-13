import { Package, Compass, BookOpen } from 'lucide-react'
import { EntityCard } from '@/components/entity-card'
import { Badge } from '@/components/ui/badge'
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

// ============================================================
// 标签映射
// ============================================================

const itemTypeLabels: Record<string, string> = {
  weapon: '武器',
  armor: '防具',
  consumable: '消耗品',
  material: '材料',
  key_item: '关键道具',
  collectible: '收集品',
  currency: '货币',
  other: '其他',
}

function itemTypeLabel(t: string): string {
  return itemTypeLabels[t] ?? t
}

const itemRarityLabels: Record<string, string> = {
  common: '普通',
  uncommon: '精良',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说',
}

function itemRarityLabel(r: string): string {
  return itemRarityLabels[r] ?? r
}

function rarityVariant(
  r: string,
): 'secondary' | 'default' | 'destructive' | 'outline' {
  if (r === 'legendary') return 'destructive'
  if (r === 'epic' || r === 'rare') return 'default'
  if (r === 'common') return 'outline'
  return 'secondary'
}
