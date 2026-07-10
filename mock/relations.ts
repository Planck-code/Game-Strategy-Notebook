// ============================================================
// GuideRelation — 攻略关联表（N:M 统一管理）
//
// 替代 Guide 上的 relatedCharacterIds / relatedBossIds 等数组字段。
// 新增关联类型只需新增 targetType 枚举值，无需修改 Guide 结构。
// ============================================================

export type ReferenceType = 'character' | 'boss' | 'map' | 'quest' | 'item'

export type GuideRelation = {
  id: string
  guideId: string
  targetType: ReferenceType
  targetId: string
  note?: string
  createdAt: string
}

export const guideRelations: GuideRelation[] = [
  // guide-1: 深渊教团 · 全 Boss 速通路线 — 关联最多
  { id: 'rel-1', guideId: 'guide-1', targetType: 'character', targetId: 'char-1', note: 'Margit战可召唤', createdAt: '2025-12-22' },
  { id: 'rel-2', guideId: 'guide-1', targetType: 'character', targetId: 'char-2', note: 'Godrick战可召唤', createdAt: '2025-12-23' },
  { id: 'rel-3', guideId: 'guide-1', targetType: 'boss', targetId: 'boss-1', createdAt: '2025-12-22' },
  { id: 'rel-4', guideId: 'guide-1', targetType: 'boss', targetId: 'boss-2', createdAt: '2025-12-23' },
  { id: 'rel-5', guideId: 'guide-1', targetType: 'boss', targetId: 'boss-3', createdAt: '2025-12-24' },
  { id: 'rel-6', guideId: 'guide-1', targetType: 'map', targetId: 'map-1', createdAt: '2025-12-23' },
  { id: 'rel-7', guideId: 'guide-1', targetType: 'quest', targetId: 'quest-1', createdAt: '2025-12-22' },
  { id: 'rel-8', guideId: 'guide-1', targetType: 'item', targetId: 'item-1', note: 'Godrick掉落', createdAt: '2025-12-23' },

  // guide-2: 新手开荒
  { id: 'rel-9', guideId: 'guide-2', targetType: 'character', targetId: 'char-3', note: '鹦鹉螺号招募', createdAt: '2026-01-05' },
  { id: 'rel-10', guideId: 'guide-2', targetType: 'quest', targetId: 'quest-2', createdAt: '2026-01-06' },

  // guide-4: 高难本Build
  { id: 'rel-11', guideId: 'guide-4', targetType: 'item', targetId: 'item-2', note: '核心武器', createdAt: '2026-03-01' },
  { id: 'rel-12', guideId: 'guide-4', targetType: 'item', targetId: 'item-3', note: '核心防具', createdAt: '2026-03-01' },

  // guide-5: 锻造材料速查
  { id: 'rel-13', guideId: 'guide-5', targetType: 'boss', targetId: 'boss-4', createdAt: '2025-11-10' },
]

// ============================================================
// 辅助函数
// ============================================================

/** 获取某攻略的所有关联 */
export function getRelationsByGuideId(guideId: string): GuideRelation[] {
  return guideRelations.filter((r) => r.guideId === guideId)
}

/** 获取某攻略某类型的关联 ID 列表 */
export function getRelatedIds(
  guideId: string,
  targetType: ReferenceType,
): string[] {
  return guideRelations
    .filter((r) => r.guideId === guideId && r.targetType === targetType)
    .map((r) => r.targetId)
}

/** 获取某攻略按类型分组的关联 */
export function getRelationsGrouped(guideId: string): Partial<Record<ReferenceType, GuideRelation[]>> {
  const result: Partial<Record<ReferenceType, GuideRelation[]>> = {}
  const relations = getRelationsByGuideId(guideId)
  for (const r of relations) {
    const list = result[r.targetType] ?? []
    list.push(r)
    result[r.targetType] = list
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
