// ============================================================
// 实体 → ReferencedEntity 转换工具
// ============================================================

import type { ReferenceType } from '@/mock'
import { getCharacterById, characters } from '@/mock/characters'
import { getBossById, bosses } from '@/mock/bosses'
import { getMapById, maps } from '@/mock/maps'
import { getQuestById, quests } from '@/mock/quests'
import { getItemById, items } from '@/mock/items'
import { getGameById } from '@/mock/games'

export type ReferencedEntity = {
  id: string
  type: ReferenceType
  name: string
  gameName: string
  description?: string
  imageUrl?: string
  meta?: string
}

export function resolveEntity(type: ReferenceType, id: string): ReferencedEntity | null {
  switch (type) {
    case 'character': {
      const c = getCharacterById(id)
      if (!c) return null
      return {
        id: c.id, type: 'character', name: c.name,
        gameName: getGameById(c.gameId)?.name ?? c.gameId,
        description: c.description,
        imageUrl: c.avatarImage,
        meta: c.role,
      }
    }
    case 'boss': {
      const b = getBossById(id)
      if (!b) return null
      const metaParts = [b.difficulty ? `难度: ${b.difficulty}` : '', b.phases ? `${b.phases}阶段` : ''].filter(Boolean)
      return {
        id: b.id, type: 'boss', name: b.name,
        gameName: getGameById(b.gameId)?.name ?? b.gameId,
        description: b.description,
        imageUrl: b.imageUrl,
        meta: metaParts.join(' · ') || undefined,
      }
    }
    case 'map': {
      const m = getMapById(id)
      if (!m) return null
      return {
        id: m.id, type: 'map', name: m.name,
        gameName: getGameById(m.gameId)?.name ?? m.gameId,
        description: m.description,
        meta: undefined,
      }
    }
    case 'quest': {
      const q = getQuestById(id)
      if (!q) return null
      return {
        id: q.id, type: 'quest', name: q.name,
        gameName: getGameById(q.gameId)?.name ?? q.gameId,
        description: q.description,
        meta: q.type === 'main' ? '主线' : q.type === 'side' ? '支线' : q.type,
      }
    }
    case 'item': {
      const i = getItemById(id)
      if (!i) return null
      return {
        id: i.id, type: 'item', name: i.name,
        gameName: getGameById(i.gameId)?.name ?? i.gameId,
        description: i.description,
        imageUrl: i.imageUrl,
        meta: i.rarity ? `${i.rarity} · ${i.type}` : i.type,
      }
    }
    default:
      return null
  }
}

/** 获取所有可引用实体（用于 ReferencePicker 搜索和列表） */
export function getAllReferencable(): ReferencedEntity[] {
  const results: ReferencedEntity[] = []

  for (const c of characters) {
    results.push({
      id: c.id, type: 'character' as ReferenceType, name: c.name,
      gameName: getGameById(c.gameId)?.name ?? c.gameId,
      description: c.description, meta: c.role,
    })
  }
  for (const b of bosses) {
    const metaParts = [b.difficulty, b.phases ? `${b.phases}阶段` : ''].filter(Boolean)
    results.push({
      id: b.id, type: 'boss', name: b.name,
      gameName: getGameById(b.gameId)?.name ?? b.gameId,
      description: b.description,
      meta: metaParts.join(' · ') || undefined,
    })
  }
  for (const m of maps) {
    results.push({
      id: m.id, type: 'map', name: m.name,
      gameName: getGameById(m.gameId)?.name ?? m.gameId,
      description: m.description,
    })
  }
  for (const q of quests) {
    results.push({
      id: q.id, type: 'quest', name: q.name,
      gameName: getGameById(q.gameId)?.name ?? q.gameId,
      description: q.description,
      meta: q.type === 'main' ? '主线' : q.type === 'side' ? '支线' : q.type,
    })
  }
  for (const i of items) {
    results.push({
      id: i.id, type: 'item', name: i.name,
      gameName: getGameById(i.gameId)?.name ?? i.gameId,
      description: i.description,
      meta: i.rarity ? `${i.rarity} · ${i.type}` : i.type,
    })
  }

  return results
}
