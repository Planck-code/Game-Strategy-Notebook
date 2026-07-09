'use client'

import { useMemo, useState, type MouseEvent } from 'react'
import { Gamepad2 } from 'lucide-react'
import { useWorkspace } from './workspace-provider'
import { getGameById } from '@/mock'
import { GuideListItem } from './guide-list-item'
import { GuideContextMenu } from './guide-context-menu'

export function GuideList() {
  const { filteredGuides, activeGuide, selectGuide } = useWorkspace()
  const [contextMenu, setContextMenu] = useState<{
    guideId: string
    x: number
    y: number
  } | null>(null)

  // 按游戏分组
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filteredGuides>()
    for (const g of filteredGuides) {
      const list = map.get(g.gameId) ?? []
      list.push(g)
      map.set(g.gameId, list)
    }
    return map
  }, [filteredGuides])

  const handleContextMenu = (e: MouseEvent, guideId: string) => {
    e.preventDefault()
    setContextMenu({ guideId, x: e.clientX, y: e.clientY })
  }

  // 空状态：没有任何攻略
  if (filteredGuides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
        <Gamepad2 className="size-6 text-muted-foreground/30" />
        <p className="mt-2 text-sm text-muted-foreground">
          没有匹配的攻略
        </p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          尝试调整筛选条件或创建新攻略
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
                onContextMenu={handleContextMenu}
              />
            ))}
          </div>
        )
      })}

      {/* 右键菜单 */}
      {contextMenu ? (
        <GuideContextMenu
          guideId={contextMenu.guideId}
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      ) : null}
    </div>
  )
}
