'use client'

import { Gamepad2 } from 'lucide-react'
import { useWorkspace } from './workspace-provider'
import { Tag } from '@/components/ui/tag'
import { Progress } from '@/components/ui/progress'
import { statusLabels, statusColors, getGameById } from '@/mock'
import { cn } from '@/lib/utils'

export function GuideProperties() {
  const { activeGuide, sections, tagFilter, setTagFilter } = useWorkspace()

  if (!activeGuide) {
    return (
      <div className="flex items-center justify-center px-4 py-12">
        <p className="text-xs text-muted-foreground">未选择攻略</p>
      </div>
    )
  }

  const game = getGameById(activeGuide.gameId)
  const guideSections = sections.filter((s) => s.guideId === activeGuide.id)
  const sectionCount = guideSections.length
  const completedSections = guideSections.filter(
    (s) => s.content.length > 100,
  ).length
  const progress =
    sectionCount > 0 ? Math.round((completedSections / sectionCount) * 100) : 0

  return (
    <div className="space-y-4 px-3 py-3">
      {/* 游戏 */}
      <div className="flex items-center gap-2">
        <Gamepad2 className="size-3.5 text-primary/60" />
        <span className="text-sm font-medium">{game?.name ?? activeGuide.gameId}</span>
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

      {/* 标签（可点击筛选） */}
      {activeGuide.tags.length > 0 ? (
        <div className="space-y-1.5">
          <span className="text-[13px] text-muted-foreground">
            标签
            {tagFilter ? (
              <button
                onClick={() => setTagFilter(null)}
                className="ml-1 text-[11px] text-primary hover:underline"
              >
                清除筛选
              </button>
            ) : null}
          </span>
          <div className="flex flex-wrap gap-1">
            {activeGuide.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                className="inline-flex"
              >
                <Tag
                  variant={tagFilter === tag ? 'default' : 'secondary'}
                  className="text-[11px] cursor-pointer transition-colors"
                >
                  #{tag}
                </Tag>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
