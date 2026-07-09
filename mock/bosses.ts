// ============================================================
// Boss — Boss实体
// ============================================================

export type BossDifficulty = 'easy' | 'normal' | 'hard' | 'extreme'

export type Boss = {
  id: string
  gameId: string
  name: string
  locationId?: string
  phases?: number
  difficulty?: BossDifficulty
  description?: string
  imageUrl?: string
  attributes?: Record<string, string>
  createdAt: string
  updatedAt: string
}

export const bosses: Boss[] = [
  {
    id: 'boss-1',
    gameId: 'g-elden-ring',
    name: 'Margit, the Fell Omen',
    locationId: 'loc-1',
    phases: 2,
    difficulty: 'hard',
    description: '风暴山的守门Boss，主线第一道难关。第一阶段棍杖，第二阶段光剑。',
    attributes: { 类型: '半神', 区域: 'Stormhill', 弱点: '出血/重力法术' },
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
  },
  {
    id: 'boss-2',
    gameId: 'g-elden-ring',
    name: 'Godrick the Grafted',
    locationId: 'loc-2',
    phases: 2,
    difficulty: 'hard',
    description: '风暴城之主，持有大卢恩。第二阶段接龙头后增加火焰攻击。',
    attributes: { 类型: '半神', 区域: 'Stormveil Castle', 弱点: '出血/毒' },
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
  },
  {
    id: 'boss-3',
    gameId: 'g-elden-ring',
    name: 'Rennala, Queen of the Full Moon',
    locationId: 'loc-3',
    phases: 2,
    difficulty: 'normal',
    description: '魔法学院之主，击败后可洗点。第一阶段学生，第二阶段本体。',
    attributes: { 类型: '传奇', 区域: 'Raya Lucaria', 弱点: '物理/出血' },
    createdAt: '2025-12-02',
    updatedAt: '2025-12-02',
  },
  {
    id: 'boss-4',
    gameId: 'g-monster-hunter-wilds',
    name: 'Rathalos',
    phases: 3,
    difficulty: 'normal',
    description: '火龙的经典形态，火属性攻击为主。头部和尾部可破坏。',
    attributes: { 类型: '飞龙种', 属性: '火', 弱点: '龙/雷' },
    createdAt: '2025-11-01',
    updatedAt: '2025-11-01',
  },
]

export function getBossById(id: string): Boss | undefined {
  return bosses.find((b) => b.id === id)
}

export function getBossesByGameId(gameId: string): Boss[] {
  return bosses.filter((b) => b.gameId === gameId)
}
