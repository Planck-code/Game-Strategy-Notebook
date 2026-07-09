// ============================================================
// Character — 人物实体
// ============================================================

export type Character = {
  id: string
  gameId: string
  name: string
  role?: string
  faction?: string
  description?: string
  avatarImage?: string
  attributes?: Record<string, string>
  createdAt: string
  updatedAt: string
}

export const characters: Character[] = [
  {
    id: 'char-1',
    gameId: 'g-elden-ring',
    name: 'Sorcerer Rogier',
    role: 'NPC / 召唤',
    faction: '圆桌厅堂',
    description: '可在 Margit Boss 战门口召唤的魔法师NPC',
    attributes: { 类型: '法师', 相关Boss: 'Margit' },
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
  },
  {
    id: 'char-2',
    gameId: 'g-elden-ring',
    name: 'Nepheli Loux',
    role: 'NPC / 召唤',
    faction: '圆桌厅堂',
    description: '战士型NPC，Godrick Boss 战前可召唤',
    attributes: { 类型: '战士', 相关Boss: 'Godrick' },
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
  },
  {
    id: 'char-3',
    gameId: 'g-baldurs-gate-3',
    name: 'Shadowheart',
    role: '队友',
    faction: '莎尔教团',
    description: '半精灵牧师，鹦鹉螺号即可招募，诡术领域',
    attributes: { 种族: '半精灵', 职业: '牧师', 属性: '敏捷/感知' },
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
  },
  {
    id: 'char-4',
    gameId: 'g-elden-ring',
    name: 'Ranni the Witch',
    role: 'NPC / 关键剧情',
    faction: '卡利亚王室',
    description: '魔女菈妮，涉及群星结局的重要支线NPC',
    attributes: { 类型: '法师', 相关结局: '群星结局' },
    createdAt: '2025-12-05',
    updatedAt: '2025-12-05',
  },
]

export function getCharacterById(id: string): Character | undefined {
  return characters.find((c) => c.id === id)
}

export function getCharactersByGameId(gameId: string): Character[] {
  return characters.filter((c) => c.gameId === gameId)
}
