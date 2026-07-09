// ============================================================
// Location — 地点实体（地图上的标记点）
// ============================================================

export type LocationType =
  | 'landmark'
  | 'dungeon'
  | 'town'
  | 'altar'
  | 'vendor'
  | 'spawn'
  | 'treasure'
  | 'custom'

export type Location = {
  id: string
  mapId: string
  name: string
  type: LocationType
  x?: number
  y?: number
  description?: string
  createdAt: string
  updatedAt: string
}

export const locations: Location[] = [
  {
    id: 'loc-1',
    mapId: 'map-1',
    name: 'Stormhill 入口',
    type: 'landmark',
    description: 'Margit Boss 战区域',
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
  },
  {
    id: 'loc-2',
    mapId: 'map-1',
    name: '王座厅',
    type: 'dungeon',
    description: 'Godrick Boss 战区域',
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
  },
  {
    id: 'loc-3',
    mapId: 'map-2',
    name: '大书库',
    type: 'dungeon',
    description: 'Rennala Boss 战区域',
    createdAt: '2025-12-02',
    updatedAt: '2025-12-02',
  },
]

export function getLocationById(id: string): Location | undefined {
  return locations.find((l) => l.id === id)
}

export function getLocationsByMapId(mapId: string): Location[] {
  return locations.filter((l) => l.mapId === mapId)
}
