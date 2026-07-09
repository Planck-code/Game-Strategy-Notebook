'use client'

import { Plus } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useWorkspace } from './workspace-provider'
import { GuideSearch } from './guide-search'
import { GuideFilterBar } from './guide-filter-bar'
import { GuideList } from './guide-list'
import { GuideOutlineTree } from './guide-outline-tree'

/**
 * GuideNavigator — Zone 2：攻略导航器
 */
export function GuideNavigator() {
  const { openCreateDialog } = useWorkspace()

  return (
    <div className="flex h-full flex-col">
      <GuideSearch />
      <GuideFilterBar />

      <Separator className="mx-3" />

      <ScrollArea className="flex-1">
        <div className="space-y-3 px-1 pb-4">
          {/* 攻略列表 */}
          <div>
            <div className="flex items-center justify-between px-2.5 pb-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                攻略列表
              </span>
              <button
                onClick={openCreateDialog}
                className="rounded-md p-0.5 text-muted-foreground/50 hover:bg-sidebar-accent hover:text-foreground transition-colors"
                aria-label="新建攻略"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
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
