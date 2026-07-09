'use client'

import { useEffect, useRef } from 'react'
import { Pencil, Copy, Trash2, Star } from 'lucide-react'
import { useWorkspace } from './workspace-provider'

export type GuideContextMenuProps = {
  guideId: string
  x: number
  y: number
  onClose: () => void
}

export function GuideContextMenu({ guideId, x, y, onClose }: GuideContextMenuProps) {
  const { renameGuide, deleteGuide, duplicateGuide, favoriteGuideIds, toggleFavorite } =
    useWorkspace()
  const menuRef = useRef<HTMLDivElement>(null)
  const isFav = favoriteGuideIds.has(guideId)

  // 点击外部关闭
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  // Esc 关闭
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleRename = () => {
    const newTitle = prompt('新标题：')
    if (newTitle?.trim()) {
      renameGuide(guideId, newTitle.trim())
    }
    onClose()
  }

  const handleDelete = () => {
    if (confirm('确定删除此攻略？此操作不可撤销。')) {
      deleteGuide(guideId)
    }
    onClose()
  }

  const items = [
    { label: '重命名', icon: Pencil, onClick: handleRename },
    { label: '复制攻略', icon: Copy, onClick: () => { duplicateGuide(guideId); onClose() } },
    { label: isFav ? '取消收藏' : '收藏攻略', icon: Star, onClick: () => { toggleFavorite(guideId); onClose() } },
    { label: '删除攻略', icon: Trash2, onClick: handleDelete, danger: true },
  ]

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[160px] rounded-xl border border-border/60 bg-card p-1.5 shadow-xl backdrop-blur-xl"
      style={{ left: x, top: y }}
    >
      {items.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors ${
              item.danger
                ? 'text-red-400 hover:bg-red-400/10'
                : 'text-foreground/80 hover:bg-sidebar-accent hover:text-foreground'
            }`}
          >
            <Icon className="size-3.5 shrink-0" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
