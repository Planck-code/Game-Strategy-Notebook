// ============================================================
// LocalStorage 持久化工具
//
// 为静态站点提供数据持久化能力。
// 后续接入后端 API 后，替换此文件的实现即可。
// ============================================================

const STORAGE_PREFIX = 'sn_'

const KEYS = {
  guides: `${STORAGE_PREFIX}guides`,
  sections: `${STORAGE_PREFIX}sections`,
  relations: `${STORAGE_PREFIX}relations`,
  favorites: `${STORAGE_PREFIX}favorites`,
} as const

// ============================================================
// 通用读写
// ============================================================

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage 满或不可用，静默失败
  }
}

// ============================================================
// 类型化读写（外部唯一接口）
// ============================================================

import type { Guide } from '@/mock/guides'
import type { Section } from '@/mock/sections'
import type { GuideRelation } from '@/mock/relations'

export function loadGuides(fallback: Guide[]): Guide[] {
  return read<Guide[]>(KEYS.guides, fallback)
}

export function saveGuides(data: Guide[]): void {
  write(KEYS.guides, data)
}

export function loadSections(fallback: Section[]): Section[] {
  return read<Section[]>(KEYS.sections, fallback)
}

export function saveSections(data: Section[]): void {
  write(KEYS.sections, data)
}

export function loadRelations(fallback: GuideRelation[]): GuideRelation[] {
  return read<GuideRelation[]>(KEYS.relations, fallback)
}

export function saveRelations(data: GuideRelation[]): void {
  write(KEYS.relations, data)
}

export function loadFavorites(fallback: string[]): string[] {
  return read<string[]>(KEYS.favorites, fallback)
}

export function saveFavorites(data: string[]): void {
  write(KEYS.favorites, data)
}
