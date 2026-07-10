'use client'

import { Link2, User, Swords, Map, ScrollText, Package } from 'lucide-react'
import { useWorkspace } from './workspace-provider'
import {
  getRelationsGrouped,
  type ReferenceType,
  getCharacterById,
  getBossById,
  getMapById,
  getQuestById,
  getItemById,
} from '@/mock'

const typeConfig: Record<ReferenceType, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  character: { icon: User, label: '人物' },
  boss: { icon: Swords, label: 'Boss' },
  map: { icon: Map, label: '地图' },
  quest: { icon: ScrollText, label: '任务' },
  item: { icon: Package, label: '道具' },
}

/** 根据 targetType 和 targetId 查找目标实体名称 */
function resolveTargetName(type: ReferenceType, targetId: string): string {
  switch (type) {
    case 'character': return getCharacterById(targetId)?.name ?? targetId
    case 'boss': return getBossById(targetId)?.name ?? targetId
    case 'map': return getMapById(targetId)?.name ?? targetId
    case 'quest': return getQuestById(targetId)?.name ?? targetId
    case 'item': return getItemById(targetId)?.name ?? targetId
    default: return targetId
  }
}

export function ReferenceManager() {
  const { activeGuide } = useWorkspace()

  if (!activeGuide) return null

  const grouped = getRelationsGrouped(activeGuide.id)
  const hasAny = Object.values(grouped).some((list) => list && list.length > 0)

  if (!hasAny) {
    return (
      <div className="px-3 py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
          <Link2 className="size-3.5" />
          <span>暂无关联内容</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2 px-3 py-3">
      {(['character', 'boss', 'map', 'quest', 'item'] as ReferenceType[]).map((type) => {
        const relations = grouped[type]
        if (!relations || relations.length === 0) return null

        const { icon: TypeIcon, label } = typeConfig[type]

        return (
          <div key={type} className="space-y-1">
            <div className="flex items-center gap-1.5">
              <TypeIcon className="size-3 text-muted-foreground/60" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                {label}
              </span>
            </div>
            {relations.map((rel) => (
              <div
                key={rel.id}
                className="flex items-center gap-2 rounded-md bg-background/50 px-2.5 py-1.5 text-[13px]"
                title={rel.note}
              >
                <span className="flex-1 truncate">
                  {resolveTargetName(rel.targetType, rel.targetId)}
                </span>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
