'use client'

import { Gamepad2 } from 'lucide-react'
import { useWorkspace } from './workspace-provider'
import { Tag } from '@/components/ui/tag'
import { Progress } from '@/components/ui/progress'
import { statusLabels, statusColors } from '@/mock/guides'
import { cn } from '@/lib/utils'

export function GuideProperties() {
  const { activeGuide } = useWorkspace()

  if (!activeGuide) {
    return (
      <div className="flex items-center justify-center px-4 py-12">
        <p className="text-xs text-muted-foreground">未选择攻略</p>
      </div>
    )
  }

  const sectionCount = activeGuide.sections.length
  const completedSections = activeGuide.sections.filter(
    (s) => s.content.length > 100,
  ).length
  const progress =
    sectionCount > 0 ? Math.round((completedSections / sectionCount) * 100) : 0

  return (
    <div className="space-y-4 px-3 py-3">
      {/* 游戏 */}
      <div className="flex items-center gap-2">
        <Gamepad2 className="size-3.5 text-primary/60" />
        <span className="text-sm font-medium">{activeGuide.gameName}</span>
      </div>

      {/* 状态 */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'inline-block size-1.5 rounded-full',
            statusColors[activeGuide.status],
          )}
        />
        <span className="text-[13px] text-muted-foreground">状态：</span>
        <span className="text-[13px] font-medium">
          {statusLabels[activeGuide.status]}
        </span>
      </div>

      {/* 进度 */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-muted-foreground">进度</span>
          <span className="font-mono text-xs">{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* 标签 */}
      {activeGuide.tags.length > 0 ? (
        <div className="space-y-1.5">
          <span className="text-[13px] text-muted-foreground">标签</span>
          <div className="flex flex-wrap gap-1">
            {activeGuide.tags.map((tag) => (
              <Tag key={tag} variant="secondary" className="text-[11px]">
                #{tag}
              </Tag>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
