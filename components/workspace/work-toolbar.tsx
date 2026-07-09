'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Undo2, Redo2, Star, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useWorkspace } from './workspace-provider'

export function WorkToolbar() {
  const {
    activeGuide,
    saveStatus,
    favoriteGuideIds,
    renameGuide,
    toggleFavorite,
  } = useWorkspace()

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [isEditingTitle])

  // 切换攻略时退出编辑态
  useEffect(() => {
    setIsEditingTitle(false)
  }, [activeGuide?.id])

  if (!activeGuide) return null

  const isFav = favoriteGuideIds.has(activeGuide.id)

  const handleStartRename = () => {
    setEditTitle(activeGuide.title)
    setIsEditingTitle(true)
  }

  const handleSaveRename = () => {
    if (editTitle.trim() && editTitle.trim() !== activeGuide.title) {
      renameGuide(activeGuide.id, editTitle.trim())
    }
    setIsEditingTitle(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveRename()
    if (e.key === 'Escape') setIsEditingTitle(false)
  }

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

      {/* 中间：可编辑标题 */}
      <div className="flex flex-1 items-center justify-center min-w-0">
        {isEditingTitle ? (
          <input
            ref={titleInputRef}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSaveRename}
            onKeyDown={handleKeyDown}
            className="h-7 w-full max-w-xs rounded-lg border border-border bg-background px-2 text-center text-[13px] font-medium outline-none focus-visible:border-ring"
          />
        ) : (
          <button
            onClick={handleStartRename}
            className="truncate max-w-[300px] font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            title="点击重命名"
          >
            {activeGuide.title}
          </button>
        )}
      </div>

      {/* 右侧：收藏 + 保存状态 */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={() => toggleFavorite(activeGuide.id)}
          aria-label={isFav ? '取消收藏' : '收藏攻略'}
        >
          <Star
            className={cn(
              'size-4 transition-colors',
              isFav ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground',
            )}
          />
        </Button>

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
