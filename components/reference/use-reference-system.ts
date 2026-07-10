'use client'

import { useMemo } from 'react'
import type { ReferenceType, BackReference } from '@/mock'
import { getBackReferences } from '@/mock'
import { useWorkspace } from '@/components/workspace/workspace-provider'
import { resolveEntity, type ReferencedEntity } from './reference-utils'

export function useReferenceSystem() {
  const { relations, guides, activeGuide } = useWorkspace()

  /** 当前攻略的正向引用列表（带完整实体数据） */
  const currentReferences = useMemo(() => {
    if (!activeGuide) return []
    const rels = relations.filter((r) => r.guideId === activeGuide.id)
    return rels
      .map((r) => {
        const entity = resolveEntity(r.targetType, r.targetId)
        return entity ? { relation: r, entity } : null
      })
      .filter((x): x is { relation: typeof rels[number]; entity: ReferencedEntity } => x !== null)
  }, [activeGuide, relations])

  /** 查询某个实体的反向引用 */
  const getBackRefs = (type: ReferenceType, targetId: string): BackReference[] => {
    return getBackReferences(type, targetId, guides, relations)
  }

  return {
    currentReferences,
    getBackRefs,
  }
}
