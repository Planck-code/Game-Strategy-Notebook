// ============================================================
// Item — 道具实体
// ============================================================

export type ItemType =
  | 'weapon'
  | 'armor'
  | 'consumable'
  | 'material'
  | 'key_item'
  | 'collectible'
  | 'currency'
  | 'other'

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

export type Item = {
  id: string
  gameId: string
  name: string
  type: ItemType
  rarity?: ItemRarity
  description?: string
  acquisition?: string
  imageUrl?: string
  attributes?: Record<string, string>
  createdAt: string
  updatedAt: string
}

export const items: Item[] = [
  {
    id: 'item-1',
    gameId: 'g-elden-ring',
    name: '接肢者追忆',
    type: 'key_item',
    rarity: 'legendary',
    description: 'Godrick的追忆，可在圆桌兑换武器或战灰',
    acquisition: '击败 Godrick the Grafted',
    attributes: { 来源Boss: 'Godrick', 兑换选项: '斧枪 / 龙头拳套' },
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
  },
  {
    id: 'item-2',
    gameId: 'g-diablo-4',
    name: 'Black River',
    type: 'weapon',
    rarity: 'legendary',
    description: '暗金镰刀，Bone Spear Necro 核心武器，扩大尸爆范围',
    acquisition: '世界掉落 / 地狱狂潮宝箱',
    attributes: { 类型: '镰刀', 职业: '死灵法师', 核心技能: '尸爆' },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-01',
  },
  {
    id: 'item-3',
    gameId: 'g-diablo-4',
    name: 'Lidless Wall',
    type: 'armor',
    rarity: 'legendary',
    description: '暗金盾牌，提高 Bone Storm 覆盖率和伤害',
    acquisition: '世界掉落 / 督瑞尔',
    attributes: { 类型: '盾牌', 职业: '死灵法师', 核心技能: '骨灵风暴' },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-01',
  },
]

export function getItemById(id: string): Item | undefined {
  return items.find((i) => i.id === id)
}

export function getItemsByGameId(gameId: string): Item[] {
  return items.filter((i) => i.gameId === gameId)
}
