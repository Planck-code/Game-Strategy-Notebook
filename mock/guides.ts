// ============================================================
// 攻略 Mock Data
// ============================================================

export type GuideStatus = 'draft' | 'in_progress' | 'completed' | 'published'

export type SectionType = 'heading' | 'text' | 'list' | 'table' | 'image'

export type Section = {
  id: string
  title: string
  type: SectionType
  content: string
  order: number
  parentId: string | null
}

export type GuideAttachment = {
  id: string
  name: string
  type: 'image' | 'file'
  url: string
  size?: number
  uploadedAt: string
}

export type Guide = {
  id: string
  title: string
  gameId: string
  gameName: string
  coverImage?: string
  status: GuideStatus
  tags: string[]
  sections: Section[]
  relatedCharacterIds: string[]
  relatedBossIds: string[]
  relatedMapIds: string[]
  relatedQuestIds: string[]
  relatedItemIds: string[]
  attachments: GuideAttachment[]
  createdAt: string
  updatedAt: string
}

// ============================================================
// 游戏
// ============================================================

export const games = [
  { id: 'g1', name: 'Elden Ring', cover: '/strategy-elden-ring-boss.png' },
  { id: 'g2', name: "Baldur's Gate 3", cover: '/strategy-baldurs-gate-planning.png' },
  { id: 'g3', name: 'Cyberpunk 2077', cover: '/strategy-cyberpunk-ending.png' },
  { id: 'g4', name: 'Diablo IV', cover: '/strategy-diablo-build.png' },
  { id: 'g5', name: 'Monster Hunter Wilds', cover: '/fav-monster-hunter.png' },
  { id: 'g6', name: 'Genshin Impact', cover: '/fav-genshin-character.png' },
]

// ============================================================
// 攻略列表
// ============================================================

export const guides: Guide[] = [
  {
    id: 'guide-1',
    title: '深渊教团 · 全 Boss 速通路线',
    gameId: 'g1',
    gameName: 'Elden Ring',
    coverImage: '/strategy-elden-ring-boss.png',
    status: 'in_progress',
    tags: ['Boss攻略', '速通', '新手向'],
    sections: [
      {
        id: 'sec-1-1',
        title: '前言与准备工作',
        type: 'heading',
        content: '',
        order: 1,
        parentId: null,
      },
      {
        id: 'sec-1-2',
        title: '推荐开局职业与装备',
        type: 'text',
        content:
          '开局推荐选择武士（Samurai），自带长弓和打刀，前期清怪效率极高。备选：囚犯（Prisoner）的法术开局。\n\n核心装备：\n- 打刀 + 长弓（初始武士自带）\n- 龟壳盾（Weeping Peninsula 获取）\n- 陨石杖 + 岩石弹（Caelid 获取，智力系可选）',
        order: 2,
        parentId: null,
      },
      {
        id: 'sec-1-3',
        title: 'Boss 速通总览',
        type: 'heading',
        content: '',
        order: 3,
        parentId: null,
      },
      {
        id: 'sec-1-3-1',
        title: 'Margit, the Fell Omen',
        type: 'text',
        content:
          '位置：Stormhill\n推荐等级：20-25\n\n### 核心机制\nMargit 有两种形态切换：棍杖形态和光剑形态。棍杖形态攻击范围大但速度慢，光剑形态速度快但范围小。\n\n### 速通打法\n1. 门口召唤 Sorcerer Rogier\n2. 使用 Spirit Ash 召唤野狼\n3. 保持中距离，等他跳劈后反击\n4. 第二阶段注意圣光剑的连击，最多可连4下\n\n### 掉落\n护符槽 +1',
        order: 1,
        parentId: 'sec-1-3',
      },
      {
        id: 'sec-1-3-2',
        title: 'Godrick the Grafted',
        type: 'text',
        content:
          '位置：Stormveil Castle\n推荐等级：30-40\n\n### 核心机制\n第一阶段使用斧头攻击，第二阶段接上龙头后增加火焰范围攻击。\n\n### 速通打法\n1. 门口召唤 Nepheli Loux\n2. 第一阶段绕背输出\n3. 第二阶段注意地面火焰，向侧方翻滚\n4. 当他准备喷火时是最佳输出窗口',
        order: 2,
        parentId: 'sec-1-3',
      },
      {
        id: 'sec-1-3-3',
        title: 'Rennala, Queen of the Full Moon',
        type: 'text',
        content:
          '位置：Raya Lucaria Academy\n推荐等级：40-50\n\n### 核心机制\n第一阶段打碎持盾学生，第二阶段直接面对 Rennala 本体。注意她的法术弹幕和召唤物。\n\n### 速通打法\n1. 第一阶段快速击杀发光学生\n2. 第二阶段近身猛攻，打断施法\n3. 召唤物出现后优先处理\n4. 法术抗性装备有奇效',
        order: 3,
        parentId: 'sec-1-3',
      },
      {
        id: 'sec-1-4',
        title: 'Boss 配装推荐表',
        type: 'table',
        content:
          '| Boss | 推荐武器 | 推荐战灰 | 推荐护符 |\n|------|---------|---------|--------|\n| Margit | 打刀+8 | 居合 | 绿龟护符 |\n| Godrick | 巨剑+12 | 狮子斩 | 斧护符 |\n| Rennala | 月隐+6 | 瞬步 | 魔力龙徽护符 |',
        order: 4,
        parentId: null,
      },
    ],
    relatedCharacterIds: ['char-1', 'char-2'],
    relatedBossIds: ['boss-1', 'boss-2', 'boss-3'],
    relatedMapIds: ['map-1'],
    relatedQuestIds: ['quest-1'],
    relatedItemIds: ['item-1'],
    attachments: [
      {
        id: 'att-1',
        name: 'margit-hitbox.png',
        type: 'image',
        url: '/placeholder.jpg',
        size: 245000,
        uploadedAt: '2025-12-22',
      },
      {
        id: 'att-2',
        name: 'stormveil-route.png',
        type: 'image',
        url: '/placeholder.jpg',
        size: 380000,
        uploadedAt: '2025-12-23',
      },
      {
        id: 'att-3',
        name: 'boss-stats-comparison.xlsx',
        type: 'file',
        url: '#',
        size: 56000,
        uploadedAt: '2025-12-24',
      },
    ],
    createdAt: '2025-12-20',
    updatedAt: '2026-07-09T08:12:00Z',
  },
  {
    id: 'guide-2',
    title: '新手开荒 · 前 20 小时资源规划',
    gameId: 'g2',
    gameName: "Baldur's Gate 3",
    coverImage: '/strategy-baldurs-gate-planning.png',
    status: 'in_progress',
    tags: ['新手指南', '资源规划', '开荒'],
    sections: [
      {
        id: 'sec-2-1',
        title: '开荒核心原则',
        type: 'text',
        content:
          '前20小时最关键的决策：\n\n1. 队伍配置决定战斗难度\n2. 长休管理影响剧情触发\n3. 商人刷新机制\n4. 偷窃与对话技能的价值',
        order: 1,
        parentId: null,
      },
      {
        id: 'sec-2-2',
        title: '第一章关键节点',
        type: 'heading',
        content: '',
        order: 2,
        parentId: null,
      },
      {
        id: 'sec-2-2-1',
        title: '鹦鹉螺号 → 翡翠林（0-5小时）',
        type: 'text',
        content:
          '在鹦鹉螺号上务必拿到 Everburn Blade（指挥官掉落）。\n\n翡翠林到达后：\n- 招募 Shadowheart、Astarion、Gale、Lae’zel\n- 完成地精营地的补给商人交易\n- 不要过早触发林地保卫战',
        order: 1,
        parentId: 'sec-2-2',
      },
      {
        id: 'sec-2-2-2',
        title: '地精营地 → 幽暗地域（5-15小时）',
        type: 'text',
        content:
          '地精营地有三种进入方式：战斗、对话、伪装。推荐对话路线以最大化经验。\n\n幽暗地域入口：\n- 地精营地井下\n- 散塔林会密道\n- 茶室的传送阵',
        order: 2,
        parentId: 'sec-2-2',
      },
    ],
    relatedCharacterIds: ['char-3'],
    relatedBossIds: [],
    relatedMapIds: [],
    relatedQuestIds: ['quest-2'],
    relatedItemIds: [],
    attachments: [],
    createdAt: '2026-01-05',
    updatedAt: '2026-07-08T15:30:00Z',
  },
  {
    id: 'guide-3',
    title: '隐藏结局解锁全流程',
    gameId: 'g3',
    gameName: 'Cyberpunk 2077',
    coverImage: '/strategy-cyberpunk-ending.png',
    status: 'draft',
    tags: ['剧情', '结局', '隐藏'],
    sections: [
      {
        id: 'sec-3-1',
        title: '前置条件总览',
        type: 'text',
        content:
          '隐藏结局（Don\'t Fear the Reaper）需要满足以下条件：\n\n1. 主线推进到 Nocturne Op55N1\n2. Johnny 好感度 ≥ 70%\n3. 在 Chippin\' In 任务中的对话选择正确\n4. 在 Rogue 的约会任务中选择特定对话\n\n详细对话选项见下文。',
        order: 1,
        parentId: null,
      },
    ],
    relatedCharacterIds: [],
    relatedBossIds: [],
    relatedMapIds: [],
    relatedQuestIds: [],
    relatedItemIds: [],
    attachments: [],
    createdAt: '2026-02-14',
    updatedAt: '2026-07-07T22:00:00Z',
  },
  {
    id: 'guide-4',
    title: '高难本 Build 与配装思路',
    gameId: 'g4',
    gameName: 'Diablo IV',
    coverImage: '/strategy-diablo-build.png',
    status: 'completed',
    tags: ['配装', 'Build', '高难'],
    sections: [
      {
        id: 'sec-4-1',
        title: '当前版本 Meta 概述',
        type: 'text',
        content: 'S5 赛季高难本以 Bone Spear Necro 和 Lightning Storm Druid 为 T0。本攻略聚焦 Necro 构筑。',
        order: 1,
        parentId: null,
      },
    ],
    relatedCharacterIds: [],
    relatedBossIds: [],
    relatedMapIds: [],
    relatedQuestIds: [],
    relatedItemIds: ['item-2', 'item-3'],
    attachments: [],
    createdAt: '2026-03-01',
    updatedAt: '2026-07-06T10:45:00Z',
  },
  {
    id: 'guide-5',
    title: '锻造材料速查表',
    gameId: 'g5',
    gameName: 'Monster Hunter Wilds',
    coverImage: '/fav-monster-hunter.png',
    status: 'published',
    tags: ['资料库', '锻造', '素材'],
    sections: [
      {
        id: 'sec-5-1',
        title: '常用素材掉落表',
        type: 'table',
        content:
          '| 素材 | 来源怪物 | 部位 | 概率 |\n|------|---------|------|-----|\n| 龙玉 |  Elder Dragon | 头 | 3% |\n| 火炎袋 | Rathalos | 身体 | 15% |\n| 雷光虫 | Zinogre | 全身 | 20% |',
        order: 1,
        parentId: null,
      },
    ],
    relatedCharacterIds: [],
    relatedBossIds: ['boss-4'],
    relatedMapIds: [],
    relatedQuestIds: [],
    relatedItemIds: [],
    attachments: [],
    createdAt: '2025-11-10',
    updatedAt: '2026-07-05T09:00:00Z',
  },
]

// ============================================================
// 辅助函数
// ============================================================

/** 获取按游戏分组的攻略列表 */
export function getGuidesByGame(): Map<string, Guide[]> {
  const map = new Map<string, Guide[]>()
  for (const g of guides) {
    const list = map.get(g.gameId) ?? []
    list.push(g)
    map.set(g.gameId, list)
  }
  return map
}

/** 获取攻略的顶层章节（parentId === null） */
export function getRootSections(guide: Guide): Section[] {
  const rootSections = guide.sections.filter((s) => s.parentId === null)
  const childrenMap = new Map<string | null, Section[]>()
  for (const s of guide.sections) {
    const key = s.parentId
    const list = childrenMap.get(key) ?? []
    list.push(s)
    childrenMap.set(key, list)
  }
  return rootSections
}

/** 获取指定章节的子章节 */
export function getChildSections(guide: Guide, parentId: string): Section[] {
  return guide.sections
    .filter((s) => s.parentId === parentId)
    .sort((a, b) => a.order - b.order)
}

/** 将平铺的 sections 转为树形结构（用于大纲树渲染） */
export type SectionTreeNode = Section & { children: SectionTreeNode[] }

export function buildSectionTree(guide: Guide): SectionTreeNode[] {
  const childrenMap = new Map<string | null, Section[]>()
  for (const s of guide.sections) {
    const key = s.parentId
    const list = childrenMap.get(key) ?? []
    list.push(s)
    childrenMap.set(key, list)
  }

  function buildTree(parentId: string | null): SectionTreeNode[] {
    const list = childrenMap.get(parentId) ?? []
    return list
      .sort((a, b) => a.order - b.order)
      .map((s) => ({
        ...s,
        children: buildTree(s.id),
      }))
  }

  return buildTree(null)
}

/** 计算攻略总字数 */
export function getWordCount(guide: Guide): number {
  return guide.sections.reduce((sum, s) => sum + s.content.length, 0)
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
