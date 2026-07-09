'use client'

import { useState } from 'react'
import { ChevronRight, Hash, FileText, List, Table2, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type SectionTreeNode } from '@/mock/guides'

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  heading: Hash,
  text: FileText,
  list: List,
  table: Table2,
  image: ImageIcon,
}

export type OutlineTreeItemProps = {
  node: SectionTreeNode
  depth: number
  activeSectionId: string | null
  onSelect: (sectionId: string) => void
}

export function OutlineTreeItem({
  node,
  depth,
  activeSectionId,
  onSelect,
}: OutlineTreeItemProps) {
  const [collapsed, setCollapsed] = useState(false)
  const hasChildren = node.children.length > 0
  const isActive = activeSectionId === node.id
  const TypeIcon = typeIcons[node.type] ?? FileText

  return (
    <li>
      {/* 当前节点 */}
      <button
        onClick={() => {
          if (hasChildren) setCollapsed(!collapsed)
          onSelect(node.id)
        }}
        className={cn(
          'group flex w-full items-center gap-1.5 rounded-md py-1 text-left text-[13px] transition-colors',
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground',
        )}
        style={{ paddingLeft: `${depth * 14 + 8}px`, paddingRight: '8px' }}
      >
        {/* 展开/折叠 */}
        {hasChildren ? (
          <ChevronRight
            className={cn(
              'size-3 shrink-0 transition-transform',
              !collapsed && 'rotate-90',
            )}
          />
        ) : (
          <span className="w-3 shrink-0" />
        )}

        {/* 类型图标 */}
        <TypeIcon className="size-3 shrink-0 opacity-50" />

        {/* 标题 */}
        <span className="truncate flex-1 leading-tight">{node.title}</span>
      </button>

      {/* 子节点 */}
      {hasChildren && !collapsed ? (
        <ul>
          {node.children.map((child) => (
            <OutlineTreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              activeSectionId={activeSectionId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
