// ============================================================
// Guide — 攻略实体（核心）
//
// 不再内嵌 sections 和关联 ID 数组。
// sections → mock/sections.ts
// 关联 → mock/relations.ts
// 附件 → mock/attachments.ts
// ============================================================

export type GuideStatus = 'draft' | 'in_progress' | 'completed' | 'published'

export type Guide = {
  id: string
  title: string
  gameId: string
  coverImage?: string
  status: GuideStatus
  tags: string[]
  description?: string
  createdAt: string
  updatedAt: string
}

export const guides: Guide[] = [
  {
    id: 'guide-1',
    title: '深渊教团 · 全 Boss 速通路线',
    gameId: 'g-elden-ring',
    coverImage: '/strategy-elden-ring-boss.png',
    status: 'in_progress',
    tags: ['Boss攻略', '速通', '新手向'],
    description: 'Elden Ring 主线Boss逐个击破的详细攻略',
    createdAt: '2025-12-20',
    updatedAt: '2026-07-09T08:12:00Z',
  },
  {
    id: 'guide-2',
    title: '新手开荒 · 前 20 小时资源规划',
    gameId: 'g-baldurs-gate-3',
    coverImage: '/strategy-baldurs-gate-planning.png',
    status: 'in_progress',
    tags: ['新手指南', '资源规划', '开荒'],
    description: 'Baldur\'s Gate 3 开局最重要的决策和资源管理',
    createdAt: '2026-01-05',
    updatedAt: '2026-07-08T15:30:00Z',
  },
  {
    id: 'guide-3',
    title: '隐藏结局解锁全流程',
    gameId: 'g-cyberpunk-2077',
    coverImage: '/strategy-cyberpunk-ending.png',
    status: 'draft',
    tags: ['剧情', '结局', '隐藏'],
    description: 'Cyberpunk 2077 隐藏结局的前置条件与对话选择',
    createdAt: '2026-02-14',
    updatedAt: '2026-07-07T22:00:00Z',
  },
  {
    id: 'guide-4',
    title: '高难本 Build 与配装思路',
    gameId: 'g-diablo-4',
    coverImage: '/strategy-diablo-build.png',
    status: 'completed',
    tags: ['配装', 'Build', '高难'],
    description: 'Diablo IV S5 赛季高难本Necro构筑详解',
    createdAt: '2026-03-01',
    updatedAt: '2026-07-06T10:45:00Z',
  },
  {
    id: 'guide-5',
    title: '锻造材料速查表',
    gameId: 'g-monster-hunter-wilds',
    coverImage: '/fav-monster-hunter.png',
    status: 'published',
    tags: ['资料库', '锻造', '素材'],
    description: 'Monster Hunter Wilds 常用素材掉落表',
    createdAt: '2025-11-10',
    updatedAt: '2026-07-05T09:00:00Z',
  },
]

// ============================================================
// 辅助函数
// ============================================================

export function getGuideById(id: string): Guide | undefined {
  return guides.find((g) => g.id === id)
}

export function getGuidesByGameId(gameId: string): Guide[] {
  return guides.filter((g) => g.gameId === gameId)
}

/** 按游戏分组（用于 GuideNavigator） */
export function getGuidesByGame(): Map<string, Guide[]> {
  const map = new Map<string, Guide[]>()
  for (const g of guides) {
    const list = map.get(g.gameId) ?? []
    list.push(g)
    map.set(g.gameId, list)
  }
  return map
}

/** 状态标签映射 */
export const statusLabels: Record<GuideStatus, string> = {
  draft: '草稿',
  in_progress: '编写中',
  completed: '已完成',
  published: '已发布',
}

export const statusColors: Record<GuideStatus, string> = {
  draft: 'text-muted-foreground',
  in_progress: 'text-amber-400',
  completed: 'text-emerald-400',
  published: 'text-sky-400',
}
