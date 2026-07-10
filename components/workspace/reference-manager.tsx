'use client'

import { useState } from 'react'
import { Plus, User, Swords, Map, ScrollText, Package } from 'lucide-react'
import type { ReferenceType } from '@/mock'
import { referenceTypeLabels } from '@/mock'
import { useWorkspace } from './workspace-provider'
import { useReferenceSystem } from '@/components/reference/use-reference-system'
import { ReferenceCard } from '@/components/reference/reference-card'
import { ReferencePicker } from '@/components/reference/reference-picker'
import { ReferenceDrawer } from '@/components/reference/reference-drawer'
import { type ReferencedEntity } from '@/components/reference/reference-utils'

const typeIcons: Record<ReferenceType, React.ComponentType<{ className?: string }>> = {
  character: User,
  boss: Swords,
  map: Map,
  quest: ScrollText,
  item: Package,
}

export function ReferenceManager() {
  const { activeGuide, addReference, removeReference, relations, selectGuide } = useWorkspace()
  const { currentReferences, getBackRefs } = useReferenceSystem()

  const [pickerOpen, setPickerOpen] = useState(false)
  const [drawerEntity, setDrawerEntity] = useState<ReferencedEntity | null>(null)

  if (!activeGuide) return null

  // 已关联的 targetId 集合
  const existingRefIds = new Set(
    relations
      .filter((r) => r.guideId === activeGuide.id)
      .map((r) => r.targetId),
  )

  const handleToggleRef = (type: ReferenceType, id: string, _name: string) => {
    const existing = relations.find(
      (r) => r.guideId === activeGuide.id && r.targetType === type && r.targetId === id,
    )
    if (existing) {
      removeReference(existing.id)
    } else {
      addReference(activeGuide.id, type, id)
    }
  }

  // 当前 Drawer 中展示的实体的反向引用
  const drawerBackRefs = drawerEntity ? getBackRefs(drawerEntity.type, drawerEntity.id) : []

  if (currentReferences.length === 0) {
    return (
      <>
        <div className="px-3 py-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground/50">暂无关联</span>
            <button
              onClick={() => setPickerOpen(true)}
              className="rounded-md p-0.5 text-muted-foreground/50 hover:bg-sidebar-accent hover:text-foreground transition-colors"
              aria-label="添加关联"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>

        <ReferencePicker
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          existingRefIds={existingRefIds}
          onToggleRef={handleToggleRef}
        />
      </>
    )
  }

  // 按类型分组
  const grouped: Partial<Record<ReferenceType, typeof currentReferences>> = {}
  for (const ref of currentReferences) {
    const t = ref.entity.type
    const list = grouped[t] ?? []
    list.push(ref)
    grouped[t] = list
  }

  return (
    <>
      <div className="space-y-2 px-3 py-1.5">
        {/* 标题栏 + 添加按钮 */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
            关联 ({currentReferences.length})
          </span>
          <button
            onClick={() => setPickerOpen(true)}
            className="rounded-md p-0.5 text-muted-foreground/50 hover:bg-sidebar-accent hover:text-foreground transition-colors"
            aria-label="添加关联"
          >
            <Plus className="size-3.5" />
          </button>
        </div>

        {/* 按类型分组渲染 */}
        {(['character', 'boss', 'map', 'quest', 'item'] as ReferenceType[]).map((type) => {
          const refs = grouped[type]
          if (!refs || refs.length === 0) return null

          const TypeIcon = typeIcons[type]
          const label = referenceTypeLabels[type]

          return (
            <div key={type} className="space-y-1">
              <div className="flex items-center gap-1.5 px-0.5">
                <TypeIcon className="size-3 text-muted-foreground/60" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                  {label}
                </span>
              </div>
              {refs.map((ref) => (
                <ReferenceCard
                  key={ref.relation.id}
                  entity={ref.entity}
                  size="sm"
                  onClick={() => setDrawerEntity(ref.entity)}
                  onRemove={() => removeReference(ref.relation.id)}
                />
              ))}
            </div>
          )
        })}
      </div>

      {/* 引用选择器 */}
      <ReferencePicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        existingRefIds={existingRefIds}
        onToggleRef={handleToggleRef}
      />

      {/* 引用详情抽屉 */}
      <ReferenceDrawer
        open={!!drawerEntity}
        onClose={() => setDrawerEntity(null)}
        entity={drawerEntity}
        backRefs={drawerBackRefs}
        onNavigateToGuide={(guideId) => {
          selectGuide(guideId)
          setDrawerEntity(null)
        }}
      />
    </>
  )
}
