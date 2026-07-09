// ============================================================
// Quest — 任务实体
// ============================================================

export type QuestType = 'main' | 'side' | 'faction' | 'daily' | 'event' | 'hidden'
export type QuestStatus = 'not_started' | 'in_progress' | 'completed' | 'failed' | 'blocked'

export type Quest = {
  id: string
  gameId: string
  name: string
  type: QuestType
  status: QuestStatus
  description?: string
  objectives?: string[]
  rewards?: string[]
  prerequisites?: string[]
  order?: number
  createdAt: string
  updatedAt: string
}

export const quests: Quest[] = [
  {
    id: 'quest-1',
    gameId: 'g-elden-ring',
    name: '主线：风暴城之影',
    type: 'main',
    status: 'completed',
    description: '攻入风暴城，击败Godrick，获得大卢恩',
    objectives: ['通过风暴城正门或侧门', '击败 Margit', '深入城内', '击败 Godrick'],
    rewards: ['Godrick大卢恩', '接肢者追忆'],
    order: 1,
    createdAt: '2025-12-01',
    updatedAt: '2025-12-20',
  },
  {
    id: 'quest-2',
    gameId: 'g-baldurs-gate-3',
    name: '支线：林地保卫战',
    type: 'side',
    status: 'in_progress',
    description: '保卫翡翠林免受地精入侵',
    objectives: ['调查卡哈', '找到前往地精营地的路线', '选择立场'],
    rewards: ['翡翠林商人折扣', '独特装备'],
    order: 2,
    createdAt: '2026-01-05',
    updatedAt: '2026-07-01',
  },
]

export function getQuestById(id: string): Quest | undefined {
  return quests.find((q) => q.id === id)
}

export function getQuestsByGameId(gameId: string): Quest[] {
  return quests.filter((q) => q.gameId === gameId)
}
