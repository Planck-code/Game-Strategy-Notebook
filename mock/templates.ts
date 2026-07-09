// ============================================================
// Template — 攻略模板实体
// ============================================================

export type SectionTemplate = {
  title: string
  type: 'heading' | 'text' | 'list' | 'table' | 'image' | 'callout'
  children?: SectionTemplate[]
}

export type Template = {
  id: string
  name: string
  description?: string
  category?: string
  isBuiltIn: boolean
  sections: SectionTemplate[]
  createdAt: string
}

export const templates: Template[] = [
  {
    id: 'tpl-boss',
    name: 'Boss 攻略模板',
    description: '适用于单个 Boss 的详细攻略',
    category: 'Boss攻略',
    isBuiltIn: true,
    sections: [
      { title: 'Boss 基本信息', type: 'heading', children: [
        { title: '位置', type: 'text' },
        { title: '推荐等级', type: 'text' },
        { title: '属性弱点', type: 'table' },
      ]},
      { title: '核心机制', type: 'heading', children: [
        { title: '第一阶段', type: 'text' },
        { title: '第二阶段', type: 'text' },
      ]},
      { title: '速通打法', type: 'heading' },
      { title: '配装推荐', type: 'table' },
      { title: '掉落与奖励', type: 'list' },
    ],
    createdAt: '2025-12-01',
  },
  {
    id: 'tpl-guide',
    name: '新手开荒模板',
    description: '适用于新手向的完整开荒指南',
    category: '新手指南',
    isBuiltIn: true,
    sections: [
      { title: '开荒核心原则', type: 'text' },
      { title: '准备工作', type: 'heading', children: [
        { title: '职业/开局选择', type: 'text' },
        { title: '前期资源获取', type: 'list' },
      ]},
      { title: '关键节点', type: 'heading', children: [
        { title: '第一阶段（0-5小时）', type: 'text' },
        { title: '第二阶段（5-15小时）', type: 'text' },
        { title: '第三阶段（15-20小时）', type: 'text' },
      ]},
      { title: '避坑指南', type: 'list' },
      { title: '资源规划表', type: 'table' },
    ],
    createdAt: '2025-12-01',
  },
  {
    id: 'tpl-collection',
    name: '全收集模板',
    description: '适用于地图全收集攻略',
    category: '全收集',
    isBuiltIn: true,
    sections: [
      { title: '收集总览', type: 'heading', children: [
        { title: '收集清单', type: 'table' },
        { title: '注意事项', type: 'text' },
      ]},
      { title: '按区域划分', type: 'heading' },
      { title: '稀有物品单独说明', type: 'heading' },
      { title: '收集路线推荐', type: 'text' },
    ],
    createdAt: '2025-12-01',
  },
]
