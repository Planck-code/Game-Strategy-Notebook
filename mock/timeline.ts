// ============================================================
// TimelineEvent — 时间线事件实体
// ============================================================

export type TimelineEventType = 'plot' | 'version' | 'guide_milestone' | 'personal'

export type TimelineEvent = {
  id: string
  gameId?: string
  title: string
  type: TimelineEventType
  date: string
  description?: string
  color?: string
  createdAt: string
  updatedAt: string
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'tl-1',
    gameId: 'g-elden-ring',
    title: '深渊Boss攻略 · 第一章完成',
    type: 'guide_milestone',
    date: '2026-07-09',
    description: '完成 Elden Ring Boss 速通攻略的 Margit + Godrick 章节',
    color: '#f59e0b',
    createdAt: '2026-07-09',
    updatedAt: '2026-07-09',
  },
  {
    id: 'tl-2',
    gameId: 'g-baldurs-gate-3',
    title: '开荒攻略 · 第一章节点整理',
    type: 'guide_milestone',
    date: '2026-07-08',
    description: '完成 BG3 前20小时资源规划的章节框架',
    color: '#10b981',
    createdAt: '2026-07-08',
    updatedAt: '2026-07-08',
  },
  {
    id: 'tl-3',
    gameId: 'g-diablo-4',
    title: 'S5赛季更新',
    type: 'version',
    date: '2026-06-15',
    description: 'Diablo IV 第五赛季开始，Meta 大洗牌',
    color: '#ef4444',
    createdAt: '2026-06-15',
    updatedAt: '2026-06-15',
  },
]

export function getTimelineEventsByGameId(gameId: string): TimelineEvent[] {
  return timelineEvents.filter((e) => e.gameId === gameId)
}
