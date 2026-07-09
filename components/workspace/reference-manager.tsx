'use client'

import { Link2, User, Swords, Map, ScrollText, Package } from 'lucide-react'
import { useWorkspace } from './workspace-provider'
import { getReferencesByIds, type ReferenceType } from '@/mock/references'
import { Separator } from '@/components/ui/separator'

const typeConfig: Record<ReferenceType, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  character: { icon: User, label: '人物' },
  boss: { icon: Swords, label: 'Boss' },
  map: { icon: Map, label: '地图' },
  quest: { icon: ScrollText, label: '任务' },
  item: { icon: Package, label: '道具' },
}

export function ReferenceManager() {
  const { activeGuide } = useWorkspace()

  if (!activeGuide) return null

  // 收集所有关联 ID
  const allIds = [
    ...activeGuide.relatedCharacterIds,
    ...activeGuide.relatedBossIds,
    ...activeGuide.relatedMapIds,
    ...activeGuide.relatedQuestIds,
    ...activeGuide.relatedItemIds,
  ]

  if (allIds.length === 0) {
    return (
      <div className="px-3 py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
          <Link2 className="size-3.5" />
          <span>暂无关联内容</span>
        </div>
      </div>
    )
  }

  const matchedRefs = getReferencesByIds(allIds)

  return (
    <div className="space-y-2 px-3 py-3">
      {(['character', 'boss', 'map', 'quest', 'item'] as ReferenceType[]).map((type) => {
        const refs = matchedRefs.filter((r) => r.type === type)
        if (refs.length === 0) return null

        const { icon: TypeIcon, label } = typeConfig[type]

        return (
          <div key={type} className="space-y-1">
            <div className="flex items-center gap-1.5">
              <TypeIcon className="size-3 text-muted-foreground/60" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                {label}
              </span>
            </div>
            {refs.map((ref) => (
              <div
                key={ref.id}
                className="flex items-center gap-2 rounded-md bg-background/50 px-2.5 py-1.5 text-[13px]"
              >
                <span className="flex-1 truncate">{ref.name}</span>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
