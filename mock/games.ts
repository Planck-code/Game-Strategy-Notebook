// ============================================================
// Game — 游戏实体
// ============================================================

export type GameStatus = 'playing' | 'completed' | 'backlog' | 'abandoned'

export type Game = {
  id: string
  name: string
  nameEn?: string
  coverImage?: string
  platforms?: string[]
  genres?: string[]
  releaseDate?: string
  developer?: string
  status: GameStatus
  description?: string
  createdAt: string
  updatedAt: string
}

export const games: Game[] = [
  {
    id: 'g-elden-ring',
    name: 'Elden Ring',
    nameEn: 'Elden Ring',
    coverImage: '/strategy-elden-ring-boss.png',
    platforms: ['PC', 'PS5', 'Xbox'],
    genres: ['ARPG', '开放世界', '魂系'],
    releaseDate: '2022-02-25',
    developer: 'FromSoftware',
    status: 'playing',
    description: '开放世界魂系游戏，主线Boss速通攻略进行中',
    createdAt: '2025-12-01',
    updatedAt: '2026-07-09',
  },
  {
    id: 'g-baldurs-gate-3',
    name: "Baldur's Gate 3",
    nameEn: "Baldur's Gate 3",
    coverImage: '/strategy-baldurs-gate-planning.png',
    platforms: ['PC', 'PS5'],
    genres: ['CRPG', '回合制', 'D&D'],
    releaseDate: '2023-08-03',
    developer: 'Larian Studios',
    status: 'playing',
    description: 'D&D规则CRPG，新手开荒资源规划',
    createdAt: '2026-01-01',
    updatedAt: '2026-07-08',
  },
  {
    id: 'g-cyberpunk-2077',
    name: 'Cyberpunk 2077',
    nameEn: 'Cyberpunk 2077',
    coverImage: '/strategy-cyberpunk-ending.png',
    platforms: ['PC', 'PS5', 'Xbox'],
    genres: ['RPG', '开放世界', '科幻'],
    releaseDate: '2020-12-10',
    developer: 'CD Projekt Red',
    status: 'completed',
    description: '隐藏结局全流程解锁',
    createdAt: '2026-02-01',
    updatedAt: '2026-07-07',
  },
  {
    id: 'g-diablo-4',
    name: 'Diablo IV',
    nameEn: 'Diablo IV',
    coverImage: '/strategy-diablo-build.png',
    platforms: ['PC', 'PS5', 'Xbox'],
    genres: ['ARPG', '刷宝'],
    releaseDate: '2023-06-06',
    developer: 'Blizzard',
    status: 'playing',
    description: '高难本Build与配装研究',
    createdAt: '2026-03-01',
    updatedAt: '2026-07-06',
  },
  {
    id: 'g-monster-hunter-wilds',
    name: 'Monster Hunter Wilds',
    nameEn: 'Monster Hunter Wilds',
    coverImage: '/fav-monster-hunter.png',
    platforms: ['PC', 'PS5'],
    genres: ['ARPG', '狩猎'],
    releaseDate: '2025-02-28',
    developer: 'Capcom',
    status: 'playing',
    description: '锻造材料与怪物素材速查',
    createdAt: '2025-11-01',
    updatedAt: '2026-07-05',
  },
  {
    id: 'g-genshin-impact',
    name: '原神',
    nameEn: 'Genshin Impact',
    coverImage: '/fav-genshin-character.png',
    platforms: ['PC', 'PS5', 'Mobile'],
    genres: ['RPG', '开放世界', '抽卡'],
    releaseDate: '2020-09-28',
    developer: 'HoYoverse',
    status: 'backlog',
    description: '角色养成优先级参考',
    createdAt: '2025-10-01',
    updatedAt: '2026-06-01',
  },
]

/** 按 ID 查找游戏 */
export function getGameById(id: string): Game | undefined {
  return games.find((g) => g.id === id)
}

/** 获取游戏的封面图 URL（带回退） */
export function getGameCover(gameId: string): string | undefined {
  return getGameById(gameId)?.coverImage
}
