'use client'

import { Plus, Undo2, Redo2, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useWorkspace } from './workspace-provider'

export function WorkToolbar() {
  const { activeGuide, saveStatus } = useWorkspace()

  if (!activeGuide) return null

  return (
    <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2">
      {/* 左侧操作 */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="size-7" aria-label="添加章节">
          <Plus className="size-4" />
        </Button>
        <span className="mx-1 h-4 w-px bg-border/50" aria-hidden="true" />
        <Button variant="ghost" size="icon" className="size-7" aria-label="撤销" disabled>
          <Undo2 className="size-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="size-7" aria-label="重做" disabled>
          <Redo2 className="size-3.5" />
        </Button>
      </div>

      {/* 中间：当前编辑位置 */}
      <div className="flex flex-1 items-center justify-center">
        <span className="truncate font-mono text-[11px] text-muted-foreground">
          {activeGuide.title}
        </span>
      </div>

      {/* 右侧：保存状态 */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'flex items-center gap-1.5 font-mono text-[10px]',
            saveStatus === 'saved' && 'text-emerald-400',
            saveStatus === 'unsaved' && 'text-amber-400',
            saveStatus === 'saving' && 'text-muted-foreground',
          )}
        >
          <span
            className={cn(
              'size-1.5 rounded-full',
              saveStatus === 'saved' && 'bg-emerald-400',
              saveStatus === 'unsaved' && 'bg-amber-400',
              saveStatus === 'saving' && 'bg-muted-foreground animate-pulse',
            )}
          />
          {saveStatus === 'saved' && '已保存'}
          {saveStatus === 'unsaved' && '未保存'}
          {saveStatus === 'saving' && '保存中…'}
        </span>

        <Button variant="ghost" size="icon" className="size-7" aria-label="更多操作">
          <MoreHorizontal className="size-4" />
        </Button>
      </div>
    </div>
  )
}
