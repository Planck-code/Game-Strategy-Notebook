'use client'

import { useMemo } from 'react'
import { Gamepad2 } from 'lucide-react'
import { useWorkspace } from './workspace-provider'
import { getGuidesByGame, getGameById } from '@/mock'
import { GuideListItem } from './guide-list-item'

export function GuideList() {
  const { guides, activeGuide, selectGuide } = useWorkspace()

  // 按游戏分组
  const grouped = useMemo(() => getGuidesByGame(), [guides])

  if (guides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
        <p className="text-sm text-muted-foreground">暂无攻略</p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          点击上方按钮创建第一篇攻略
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-1 px-1.5">
      {Array.from(grouped.entries()).map(([gameId, gameGuides]) => {
        const gameName = getGameById(gameId)?.name ?? gameId
        return (
          <div key={gameId} className="pb-1">
            {/* 游戏分组标题 */}
            <div className="flex items-center gap-1.5 px-2 py-1.5">
              <Gamepad2 className="size-3 text-muted-foreground/50" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                {gameName}
              </span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground/50">
                {gameGuides.length}
              </span>
            </div>

            {/* 攻略列表 */}
            {gameGuides.map((guide) => (
              <GuideListItem
                key={guide.id}
                guide={guide}
                isActive={activeGuide?.id === guide.id}
                onClick={() => selectGuide(guide.id)}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}
