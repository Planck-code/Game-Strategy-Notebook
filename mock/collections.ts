// ============================================================
// Collection — 收藏集实体
// ============================================================

export type Collection = {
  id: string
  name: string
  description?: string
  icon?: string
  order?: number
  createdAt: string
  updatedAt: string
}

export const collections: Collection[] = [
  {
    id: 'col-1',
    name: '魂系Boss合集',
    description: '所有魂系游戏的Boss攻略整理',
    icon: 'Swords',
    order: 1,
    createdAt: '2026-01-01',
    updatedAt: '2026-07-01',
  },
  {
    id: 'col-2',
    name: '新手指南精选',
    description: '适合新手的开荒攻略',
    icon: 'GraduationCap',
    order: 2,
    createdAt: '2026-02-01',
    updatedAt: '2026-06-01',
  },
]

// ============================================================
// CollectionItem — 收藏集内容（N:M）
// ============================================================

export type CollectionItem = {
  id: string
  collectionId: string
  guideId: string
  addedAt: string
}

export const collectionItems: CollectionItem[] = [
  { id: 'ci-1', collectionId: 'col-1', guideId: 'guide-1', addedAt: '2026-01-01' },
  { id: 'ci-2', collectionId: 'col-2', guideId: 'guide-2', addedAt: '2026-02-01' },
]
