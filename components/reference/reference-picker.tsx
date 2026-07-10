'use client'

import { useState, useMemo } from 'react'
import { Search, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { type ReferenceType } from '@/mock'
import { referenceTypeLabels } from '@/mock'
import { cn } from '@/lib/utils'
import { ReferenceIcon, getReferenceColor } from './reference-icon'
import { getAllReferencable, type ReferencedEntity } from './reference-utils'

export type ReferencePickerProps = {
  open: boolean
  onClose: () => void
  existingRefIds: Set<string>
  onToggleRef: (type: ReferenceType, id: string, name: string) => void
}

export function ReferencePicker({ open, onClose, existingRefIds, onToggleRef }: ReferencePickerProps) {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState<ReferenceType | null>(null)

  const allEntities = useMemo(() => getAllReferencable(), [])

  const filtered = useMemo(() => {
    let result = allEntities
    if (activeType) result = result.filter((e) => e.type === activeType)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.gameName.toLowerCase().includes(q) ||
          (e.description && e.description.toLowerCase().includes(q)),
      )
    }
    // 已关联的排前面
    return result.sort((a, b) => {
      const aLinked = existingRefIds.has(a.id) ? 1 : 0
      const bLinked = existingRefIds.has(b.id) ? 1 : 0
      return bLinked - aLinked
    })
  }, [allEntities, search, activeType, existingRefIds])

  if (!open) return null

  const types = Object.entries(referenceTypeLabels) as [ReferenceType, string][]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 flex h-[520px] w-full max-w-lg flex-col rounded-2xl border border-border/60 bg-card shadow-2xl">
        {/* 头部 */}
        <div className="shrink-0 border-b border-border/50 p-4">
          <h2 className="text-lg font-semibold">添加关联</h2>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索人物、Boss、地图…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 rounded-xl border-border/50 bg-background/60 pl-9 text-sm"
              autoFocus
            />
          </div>
        </div>

        {/* 类型 Tab */}
        <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-border/40 px-4 py-2">
          <button
            onClick={() => setActiveType(null)}
            className={cn(
              'shrink-0 rounded-lg px-2.5 py-1 text-[12px] transition-colors',
              !activeType ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground',
            )}
          >
            全部
          </button>
          {types.map(([type, label]) => (
            <button
              key={type}
              onClick={() => setActiveType(activeType === type ? null : type)}
              className={cn(
                'flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[12px] transition-colors',
                activeType === type ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground',
              )}
            >
              <ReferenceIcon type={type} className={cn('size-3', activeType === type ? getReferenceColor(type) : '')} />
              {label}
            </button>
          ))}
        </div>

        {/* 列表 */}
        <ScrollArea className="flex-1">
          <div className="space-y-0.5 p-2">
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                无匹配结果
              </div>
            ) : (
              filtered.map((entity) => {
                const isLinked = existingRefIds.has(entity.id)
                const color = getReferenceColor(entity.type)
                return (
                  <button
                    key={`${entity.type}-${entity.id}`}
                    onClick={() => onToggleRef(entity.type, entity.id, entity.name)}
                    className={cn(
                      'flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left transition-colors',
                      isLinked
                        ? 'bg-primary/5 hover:bg-primary/10'
                        : 'hover:bg-sidebar-accent/60',
                    )}
                  >
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-muted/50">
                      <ReferenceIcon type={entity.type} className={cn('size-3.5', color)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium leading-tight">{entity.name}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {entity.gameName}
                        {entity.meta ? ` · ${entity.meta}` : ''}
                      </p>
                    </div>
                    <div className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded border transition-colors self-center',
                      isLinked ? 'border-primary/50 bg-primary/15 text-primary' : 'border-border/50',
                    )}>
                      {isLinked ? <Check className="size-3" /> : null}
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </ScrollArea>

        {/* 底部 */}
        <div className="shrink-0 border-t border-border/50 px-4 py-3">
          <button onClick={onClose} className="w-full rounded-lg bg-primary/90 py-2 text-sm font-medium text-primary-foreground hover:bg-primary transition-colors">
            完成
          </button>
        </div>
      </div>
    </div>
  )
}
