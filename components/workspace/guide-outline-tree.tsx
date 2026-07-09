'use client'

import { useMemo } from 'react'
import { ListTree } from 'lucide-react'
import { useWorkspace } from './workspace-provider'
import { buildSectionTree } from '@/mock/guides'
import { OutlineTreeItem } from './outline-tree-item'

export function GuideOutlineTree() {
  const { activeGuide, activeSection, selectSection } = useWorkspace()

  const tree = useMemo(
    () => (activeGuide ? buildSectionTree(activeGuide) : []),
    [activeGuide],
  )

  if (!activeGuide) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
        <ListTree className="size-5 text-muted-foreground/30" />
        <p className="mt-2 text-xs text-muted-foreground">选择一篇攻略</p>
      </div>
    )
  }

  if (tree.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
        <p className="text-xs text-muted-foreground">暂无章节</p>
        <p className="mt-1 text-[11px] text-muted-foreground/60">
          点击工具栏添加第一章
        </p>
      </div>
    )
  }

  return (
    <nav aria-label="攻略大纲">
      <ul className="space-y-0.5">
        {tree.map((node) => (
          <OutlineTreeItem
            key={node.id}
            node={node}
            depth={0}
            activeSectionId={activeSection?.id ?? null}
            onSelect={selectSection}
          />
        ))}
      </ul>
    </nav>
  )
}
