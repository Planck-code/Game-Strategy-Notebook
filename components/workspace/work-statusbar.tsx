'use client'

import { useWorkspace } from './workspace-provider'
import { getWordCount } from '@/mock/guides'

export function WorkStatusbar() {
  const { activeGuide, activeSection } = useWorkspace()

  if (!activeGuide) return null

  const wordCount = getWordCount(activeGuide)
  const sectionIndex = activeSection
    ? activeGuide.sections
        .filter((s) => s.parentId === null)
        .findIndex((s) => s.id === activeSection?.id || activeSection?.parentId === s.id) + 1
    : 0
  const totalSections = activeGuide.sections.filter((s) => s.parentId === null).length

  return (
    <div className="flex items-center justify-between border-t border-border/50 px-4 py-1.5">
      <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
        {sectionIndex > 0 ? (
          <span>
            第 {sectionIndex}/{totalSections} 节
          </span>
        ) : null}
        <span>{wordCount.toLocaleString()} 字</span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground/60">
        <span>
          更新于{' '}
          {new Date(activeGuide.updatedAt).toLocaleDateString('zh-CN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  )
}
