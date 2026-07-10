'use client'

import { X, ExternalLink } from 'lucide-react'
import { type ReferencedEntity } from './reference-utils'
import { ReferenceCard } from './reference-card'
import { ReferenceIcon, getReferenceColor } from './reference-icon'
import { type BackReference } from '@/mock'
import { cn } from '@/lib/utils'

export type ReferenceDrawerProps = {
  open: boolean
  onClose: () => void
  entity: ReferencedEntity | null
  backRefs: BackReference[]
  onNavigateToGuide?: (guideId: string) => void
}

export function ReferenceDrawer({
  open,
  onClose,
  entity,
  backRefs,
  onNavigateToGuide,
}: ReferenceDrawerProps) {
  if (!open || !entity) return null

  const color = getReferenceColor(entity.type)

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* 面板 */}
      <div className="relative z-10 flex h-full w-full max-w-[400px] flex-col border-l border-border/60 bg-card shadow-2xl animate-in slide-in-from-right duration-300">
        {/* 头部 */}
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <ReferenceIcon type={entity.type} className={cn('size-4', color)} />
            <span className="text-sm font-semibold">
              {entity.type === 'character' ? '人物' :
               entity.type === 'boss' ? 'Boss' :
               entity.type === 'map' ? '地图' :
               entity.type === 'quest' ? '任务' : '道具'} 详情
            </span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors" aria-label="关闭">
            <X className="size-4" />
          </button>
        </div>

        {/* 实体详情 */}
        <div className="border-b border-border/40 px-4 py-4">
          <ReferenceCard entity={entity} size="md" />
        </div>

        {/* 反向引用 */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              被以下攻略引用 ({backRefs.length})
            </p>
            {backRefs.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground/50">
                暂无攻略引用此{entity.type === 'character' ? '人物' : entity.type === 'boss' ? 'Boss' : '实体'}
              </p>
            ) : (
              <div className="mt-2 space-y-1">
                {backRefs.map((br) => (
                  <button
                    key={br.relation.id}
                    onClick={() => onNavigateToGuide?.(br.guide.id)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors hover:bg-sidebar-accent/60"
                  >
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted/50">
                      <ExternalLink className="size-3 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">{br.guide.title}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {br.relation.note ? `${br.relation.note}` : '更新于 '}
                        {!br.relation.note && new Date(br.guide.updatedAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
