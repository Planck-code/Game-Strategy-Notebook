// ============================================================
// Map — 地图实体
// ============================================================

export type Map = {
  id: string
  gameId: string
  name: string
  imageUrl?: string
  description?: string
  order?: number
  createdAt: string
  updatedAt: string
}

export const maps: Map[] = [
  {
    id: 'map-1',
    gameId: 'g-elden-ring',
    name: 'Stormveil Castle',
    description: '风暴城，湖区之前的主线大迷宫',
    order: 1,
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
  },
  {
    id: 'map-2',
    gameId: 'g-elden-ring',
    name: 'Raya Lucaria Academy',
    description: '魔法学院，湖区的核心地牢',
    order: 2,
    createdAt: '2025-12-02',
    updatedAt: '2025-12-02',
  },
]

export function getMapById(id: string): Map | undefined {
  return maps.find((m) => m.id === id)
}

export function getMapsByGameId(gameId: string): Map[] {
  return maps.filter((m) => m.gameId === gameId)
}
