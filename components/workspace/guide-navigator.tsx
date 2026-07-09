'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { GuideSearch } from './guide-search'
import { GuideList } from './guide-list'
import { GuideOutlineTree } from './guide-outline-tree'

/**
 * GuideNavigator — Zone 2：攻略导航器
 *
 * 包含：
 * - 搜索框
 * - 攻略列表（按游戏分组）
 * - 当前攻略的大纲树
 */
export function GuideNavigator() {
  return (
    <div className="flex h-full flex-col">
      <GuideSearch />

      <ScrollArea className="flex-1">
        <div className="space-y-3 px-1 pb-4">
          {/* 攻略列表 */}
          <div>
            <p className="px-2.5 pb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              攻略列表
            </p>
            <GuideList />
          </div>

          <Separator className="mx-2" />

          {/* 大纲树 */}
          <div>
            <p className="px-2.5 pb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              大纲
            </p>
            <GuideOutlineTree />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
