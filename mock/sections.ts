// ============================================================
// Section — 章节实体（树形结构，关联 Guide）
// ============================================================

export type SectionType = 'heading' | 'text' | 'list' | 'table' | 'image' | 'callout'

export type Section = {
  id: string
  guideId: string
  parentId: string | null
  title: string
  type: SectionType
  content: string
  order: number
  createdAt: string
  updatedAt: string
}

export const sections: Section[] = [
  // ==========================================
  // guide-1: 深渊教团 · 全 Boss 速通路线
  // ==========================================
  {
    id: 'sec-1-1',
    guideId: 'guide-1',
    parentId: null,
    title: '前言与准备工作',
    type: 'heading',
    content: '',
    order: 1,
    createdAt: '2025-12-20',
    updatedAt: '2026-07-09',
  },
  {
    id: 'sec-1-2',
    guideId: 'guide-1',
    parentId: null,
    title: '推荐开局职业与装备',
    type: 'text',
    content:
      '开局推荐选择武士（Samurai），自带长弓和打刀，前期清怪效率极高。备选：囚犯（Prisoner）的法术开局。\n\n核心装备：\n- 打刀 + 长弓（初始武士自带）\n- 龟壳盾（Weeping Peninsula 获取）\n- 陨石杖 + 岩石弹（Caelid 获取，智力系可选）',
    order: 2,
    createdAt: '2025-12-20',
    updatedAt: '2026-07-09',
  },
  {
    id: 'sec-1-3',
    guideId: 'guide-1',
    parentId: null,
    title: 'Boss 速通总览',
    type: 'heading',
    content: '',
    order: 3,
    createdAt: '2025-12-21',
    updatedAt: '2026-07-08',
  },
  {
    id: 'sec-1-3-1',
    guideId: 'guide-1',
    parentId: 'sec-1-3',
    title: 'Margit, the Fell Omen',
    type: 'text',
    content:
      '位置：Stormhill\n推荐等级：20-25\n\n### 核心机制\nMargit 有两种形态切换：棍杖形态和光剑形态。棍杖形态攻击范围大但速度慢，光剑形态速度快但范围小。\n\n### 速通打法\n1. 门口召唤 Sorcerer Rogier\n2. 使用 Spirit Ash 召唤野狼\n3. 保持中距离，等他跳劈后反击\n4. 第二阶段注意圣光剑的连击，最多可连4下\n\n### 掉落\n护符槽 +1',
    order: 1,
    createdAt: '2025-12-22',
    updatedAt: '2026-07-08',
  },
  {
    id: 'sec-1-3-2',
    guideId: 'guide-1',
    parentId: 'sec-1-3',
    title: 'Godrick the Grafted',
    type: 'text',
    content:
      '位置：Stormveil Castle\n推荐等级：30-40\n\n### 核心机制\n第一阶段使用斧头攻击，第二阶段接上龙头后增加火焰范围攻击。\n\n### 速通打法\n1. 门口召唤 Nepheli Loux\n2. 第一阶段绕背输出\n3. 第二阶段注意地面火焰，向侧方翻滚\n4. 当他准备喷火时是最佳输出窗口',
    order: 2,
    createdAt: '2025-12-23',
    updatedAt: '2026-07-07',
  },
  {
    id: 'sec-1-3-3',
    guideId: 'guide-1',
    parentId: 'sec-1-3',
    title: 'Rennala, Queen of the Full Moon',
    type: 'text',
    content:
      '位置：Raya Lucaria Academy\n推荐等级：40-50\n\n### 核心机制\n第一阶段打碎持盾学生，第二阶段直接面对 Rennala 本体。注意她的法术弹幕和召唤物。\n\n### 速通打法\n1. 第一阶段快速击杀发光学生\n2. 第二阶段近身猛攻，打断施法\n3. 召唤物出现后优先处理\n4. 法术抗性装备有奇效',
    order: 3,
    createdAt: '2025-12-24',
    updatedAt: '2026-07-06',
  },
  {
    id: 'sec-1-4',
    guideId: 'guide-1',
    parentId: null,
    title: 'Boss 配装推荐表',
    type: 'table',
    content:
      '| Boss | 推荐武器 | 推荐战灰 | 推荐护符 |\n|------|---------|---------|--------|\n| Margit | 打刀+8 | 居合 | 绿龟护符 |\n| Godrick | 巨剑+12 | 狮子斩 | 斧护符 |\n| Rennala | 月隐+6 | 瞬步 | 魔力龙徽护符 |',
    order: 4,
    createdAt: '2025-12-25',
    updatedAt: '2026-07-05',
  },

  // ==========================================
  // guide-2: 新手开荒 · 前 20 小时资源规划
  // ==========================================
  {
    id: 'sec-2-1',
    guideId: 'guide-2',
    parentId: null,
    title: '开荒核心原则',
    type: 'text',
    content:
      '前20小时最关键的决策：\n\n1. 队伍配置决定战斗难度\n2. 长休管理影响剧情触发\n3. 商人刷新机制\n4. 偷窃与对话技能的价值',
    order: 1,
    createdAt: '2026-01-05',
    updatedAt: '2026-07-08',
  },
  {
    id: 'sec-2-2',
    guideId: 'guide-2',
    parentId: null,
    title: '第一章关键节点',
    type: 'heading',
    content: '',
    order: 2,
    createdAt: '2026-01-06',
    updatedAt: '2026-07-07',
  },
  {
    id: 'sec-2-2-1',
    guideId: 'guide-2',
    parentId: 'sec-2-2',
    title: '鹦鹉螺号 → 翡翠林（0-5小时）',
    type: 'text',
    content:
      '在鹦鹉螺号上务必拿到 Everburn Blade（指挥官掉落）。\n\n翡翠林到达后：\n- 招募 Shadowheart、Astarion、Gale、Lae\'zel\n- 完成地精营地的补给商人交易\n- 不要过早触发林地保卫战',
    order: 1,
    createdAt: '2026-01-07',
    updatedAt: '2026-07-06',
  },
  {
    id: 'sec-2-2-2',
    guideId: 'guide-2',
    parentId: 'sec-2-2',
    title: '地精营地 → 幽暗地域（5-15小时）',
    type: 'text',
    content:
      '地精营地有三种进入方式：战斗、对话、伪装。推荐对话路线以最大化经验。\n\n幽暗地域入口：\n- 地精营地井下\n- 散塔林会密道\n- 茶室的传送阵',
    order: 2,
    createdAt: '2026-01-08',
    updatedAt: '2026-07-05',
  },

  // ==========================================
  // guide-3: 隐藏结局解锁全流程
  // ==========================================
  {
    id: 'sec-3-1',
    guideId: 'guide-3',
    parentId: null,
    title: '前置条件总览',
    type: 'text',
    content:
      '隐藏结局（Don\'t Fear the Reaper）需要满足以下条件：\n\n1. 主线推进到 Nocturne Op55N1\n2. Johnny 好感度 ≥ 70%\n3. 在 Chippin\' In 任务中的对话选择正确\n4. 在 Rogue 的约会任务中选择特定对话\n\n详细对话选项见下文。',
    order: 1,
    createdAt: '2026-02-14',
    updatedAt: '2026-07-07',
  },

  // ==========================================
  // guide-4: 高难本 Build 与配装思路
  // ==========================================
  {
    id: 'sec-4-1',
    guideId: 'guide-4',
    parentId: null,
    title: '当前版本 Meta 概述',
    type: 'text',
    content:
      'S5 赛季高难本以 Bone Spear Necro 和 Lightning Storm Druid 为 T0。本攻略聚焦 Necro 构筑。',
    order: 1,
    createdAt: '2026-03-01',
    updatedAt: '2026-07-06',
  },

  // ==========================================
  // guide-5: 锻造材料速查表
  // ==========================================
  {
    id: 'sec-5-1',
    guideId: 'guide-5',
    parentId: null,
    title: '常用素材掉落表',
    type: 'table',
    content:
      '| 素材 | 来源怪物 | 部位 | 概率 |\n|------|---------|------|-----|\n| 龙玉 | Elder Dragon | 头 | 3% |\n| 火炎袋 | Rathalos | 身体 | 15% |\n| 雷光虫 | Zinogre | 全身 | 20% |',
    order: 1,
    createdAt: '2025-11-10',
    updatedAt: '2026-07-05',
  },
]

// ============================================================
// 辅助函数
// ============================================================

/** 获取某攻略的所有章节 */
export function getSectionsByGuideId(guideId: string): Section[] {
  return sections.filter((s) => s.guideId === guideId)
}

/** 获取顶层章节（parentId === null） */
export function getRootSections(guideId: string): Section[] {
  return sections
    .filter((s) => s.guideId === guideId && s.parentId === null)
    .sort((a, b) => a.order - b.order)
}

/** 获取子章节 */
export function getChildSections(parentId: string): Section[] {
  return sections
    .filter((s) => s.parentId === parentId)
    .sort((a, b) => a.order - b.order)
}

/** 将平铺 sections 转为树形 */
export type SectionTreeNode = Section & { children: SectionTreeNode[] }

export function buildSectionTree(guideId: string): SectionTreeNode[] {
  const guideSections = getSectionsByGuideId(guideId)
  const byParent = new Map<string | null, Section[]>()
  for (const s of guideSections) {
    const key = s.parentId
    const list = byParent.get(key) ?? []
    list.push(s)
    byParent.set(key, list)
  }

  function build(parentId: string | null): SectionTreeNode[] {
    const list = byParent.get(parentId) ?? []
    return list
      .sort((a, b) => a.order - b.order)
      .map((s) => ({ ...s, children: build(s.id) }))
  }

  return build(null)
}

/** 计算攻略总字数 */
export function getWordCount(guideId: string): number {
  return getSectionsByGuideId(guideId).reduce(
    (sum, s) => sum + s.content.length,
    0,
  )
}
