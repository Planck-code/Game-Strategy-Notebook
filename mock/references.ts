// ============================================================
// 可关联资源 Mock Data（人物/Boss/地图/任务/道具）
// ============================================================

export type ReferenceType = 'character' | 'boss' | 'map' | 'quest' | 'item'

export type Reference = {
  id: string
  type: ReferenceType
  name: string
  gameId: string
  gameName: string
  description?: string
  iconUrl?: string
}

export const references: Reference[] = [
  // ---- 人物 ----
  {
    id: 'char-1',
    type: 'character',
    name: 'Sorcerer Rogier',
    gameId: 'g1',
    gameName: 'Elden Ring',
    description: '可召唤的NPC，在 Margit Boss 战门口',
  },
  {
    id: 'char-2',
    type: 'character',
    name: 'Nepheli Loux',
    gameId: 'g1',
    gameName: 'Elden Ring',
    description: '战士型NPC，Godrick Boss 战前可召唤',
  },
  {
    id: 'char-3',
    type: 'character',
    name: 'Shadowheart',
    gameId: 'g2',
    gameName: "Baldur's Gate 3",
    description: '半精灵牧师，鹦鹉螺号即可招募',
  },
  {
    id: 'char-4',
    type: 'character',
    name: 'Ranni the Witch',
    gameId: 'g1',
    gameName: 'Elden Ring',
    description: '魔女菈妮，涉及群星结局支线',
  },

  // ---- Boss ----
  {
    id: 'boss-1',
    type: 'boss',
    name: 'Margit, the Fell Omen',
    gameId: 'g1',
    gameName: 'Elden Ring',
    description: '风暴山的守门Boss，主线第一道难关',
  },
  {
    id: 'boss-2',
    type: 'boss',
    name: 'Godrick the Grafted',
    gameId: 'g1',
    gameName: 'Elden Ring',
    description: '风暴城之主，持有大卢恩',
  },
  {
    id: 'boss-3',
    type: 'boss',
    name: 'Rennala, Queen of the Full Moon',
    gameId: 'g1',
    gameName: 'Elden Ring',
    description: '魔法学院之主，可洗点',
  },
  {
    id: 'boss-4',
    type: 'boss',
    name: 'Rathalos',
    gameId: 'g5',
    gameName: 'Monster Hunter Wilds',
    description: '火龙的经典形态，火属性攻击为主',
  },

  // ---- 地图 ----
  {
    id: 'map-1',
    type: 'map',
    name: 'Stormveil Castle',
    gameId: 'g1',
    gameName: 'Elden Ring',
    description: '风暴城，湖区之前的主线大迷宫',
  },
  {
    id: 'map-2',
    type: 'map',
    name: 'Raya Lucaria Academy',
    gameId: 'g1',
    gameName: 'Elden Ring',
    description: '魔法学院，湖区的核心地牢',
  },

  // ---- 任务 ----
  {
    id: 'quest-1',
    type: 'quest',
    name: '主线：风暴城之影',
    gameId: 'g1',
    gameName: 'Elden Ring',
    description: '攻入风暴城，击败Godrick',
  },
  {
    id: 'quest-2',
    type: 'quest',
    name: '支线：林地保卫战',
    gameId: 'g2',
    gameName: "Baldur's Gate 3",
    description: '保卫翡翠林免受地精入侵',
  },

  // ---- 道具 ----
  {
    id: 'item-1',
    type: 'item',
    name: '接肢者追忆',
    gameId: 'g1',
    gameName: 'Elden Ring',
    description: 'Godrick的追忆，可在圆桌兑换武器或战灰',
  },
  {
    id: 'item-2',
    type: 'item',
    name: 'Black River',
    gameId: 'g4',
    gameName: 'Diablo IV',
    description: '暗金镰刀，Bone Spear Necro 核心武器',
  },
  {
    id: 'item-3',
    type: 'item',
    name: 'Lidless Wall',
    gameId: 'g4',
    gameName: 'Diablo IV',
    description: '暗金盾牌，提高 Bone Storm 覆盖率',
  },
]

// ============================================================
// 辅助函数
// ============================================================

/** 根据 ID 列表获取关联资源 */
export function getReferencesByIds(ids: string[]): Reference[] {
  return references.filter((r) => ids.includes(r.id))
}

/** 按类型分组 */
export function getReferencesByType(
  ids: string[],
): Partial<Record<ReferenceType, Reference[]>> {
  const result: Partial<Record<ReferenceType, Reference[]>> = {}
  const matched = getReferencesByIds(ids)
  for (const r of matched) {
    const list = result[r.type] ?? []
    list.push(r)
    result[r.type] = list
  }
  return result
}

/** 关联类型中文标签 */
export const referenceTypeLabels: Record<ReferenceType, string> = {
  character: '人物',
  boss: 'Boss',
  map: '地图',
  quest: '任务',
  item: '道具',
}
